import crypto from 'node:crypto'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {AppError,catchError} from '../../utilities/error/error.js'
import {User} from '../../../DB/models/user.model.js'
import { sendEmail } from '../../utilities/error/email/confirmEmail/confirmEmail.js'
import { ConfirmEmailTemplate } from '../../utilities/error/email/confirmEmail/confirmEmailTemplate.js'
import { resetPasswordTemplate } from '../../utilities/error/email/resetPasswordTemplate.js'

export const register = catchError(async(req,res,next)=>{
    const user = await User.insertMany(req.body)
    const token = jwt.sign({id:user.id,email:user.email},process.env.SECRET_KEY,{expiresIn:'24h'})
    user.password = undefined
    
    sendEmail(user.email, 'Confirm Email', ConfirmEmailTemplate(token))
    res.status(201).json({
        data: user,
        statusMessage:'User created successfully'
    })
})

export const login = catchError(async(req,res,next)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    !user && next(new AppError('Invalid email or password',401,'failed'))
    const matchPassword = bcrypt.compareSync(password,user.password)
    !matchPassword && next(new AppError('Invalid email or password',401,'failed'))


})

export const logout = catchError(async(req,res,next)=>{

})

export const verifyEmail = catchError(async(req,res,next)=>{
    const {token} = req.params.token
      jwt.verify(token,process.env.SECRET_KEY,async(error,decoded)=>{
        error && next(new AppError('Invalid token',401,'failed'))
        const user = await User.findByIdAndUpdate(decoded.id,{emailVerified:true},{new:true})
        !user && next(new AppError('User not found',404,'failed'))
        user.password = undefined
        res.status(200).json({
          data: user,
          statusMessage:'Email verified successfully'
        })
      })
})

export const forgotPassword = catchError(async(req,res,next)=>{
  const user = await User.findOne({email:req.body.email})
  !user && next(new AppError('User not found',404,'failed'))
  const token = jwt.sign({id:user.id,email:user.email},process.env.SECRET_KEY,{expiresIn:'1h'})
  sendEmail(user.email, 'Reset Password', resetPasswordTemplate(token))
  res.status(200).json({
    data: user,
    statusMessage:'Reset password link sent successfully'
  })
})

export const resetPassword = catchError(async(req,res,next)=>{
  const {token} = req.params.token
  jwt.verify(token,process.env.SECRET_KEY,async(error,decoded)=>{
    error && next(new AppError('Invalid token',401,'failed'))
    const user = await User.findByIdAndUpdate(decoded.id,{password:req.body.password},{new:true})
    user.password = undefined
    res.status(200).json({
      data: user,
      statusMessage:'Password reset successfully'
    })
  })
})

export const changePassword = catchError(async(req,res,next)=>{
  const user = await User.findById(req.user.id)
  const matchPassword = bcrypt.compareSync(req.body.oldPassword,user.password)
  !matchPassword && next(new AppError('Old password is incorrect',401,'failed'))
  const newUser = await User.findByIdAndUpdate(req.user.id,{password:req.body.oldPassword},{new:true})
  newUser.password = undefined
  res.status(200).json({
    data: newUser,
    statusMessage:'Password changed successfully'
  })
})

