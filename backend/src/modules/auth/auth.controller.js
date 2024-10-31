import crypto from 'node:crypto'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {AppError,catchError} from '../../utilities/error/error.js'
import {User} from '../../../DB/models/user.model.js'
import { sendEmail } from '../../utilities/error/email/confirmEmail/confirmEmail.js'
import { ConfirmEmailTemplate } from '../../utilities/error/email/confirmEmail/confirmEmailTemplate.js'
import { resetPasswordTemplate } from '../../utilities/error/email/resetPasswordTemplate.js'
import { generateAccessToken, generateRefreshToken } from './auth.middleware.js'

export const register = catchError(async (req, res, next) => {
  const user = await User.create(req.body);
  
  const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: '24h' }
  );

  user.password = undefined;

  sendEmail(user.email, 'Confirm Email', ConfirmEmailTemplate, token);

  return res.status(201).json({
      statusMessage: 'User created successfully, please confirm your email'
  });
});


export const login = catchError(async (req,res,next)=>{
  const isProduction = process.env.MOOD === 'production';
  const {email,password} = req.body
  const user = await User.findOne({email})
  if(!user) return next(new AppError('Invalid email or password',422,'failed'))
  if(!user.confirmPassword) return next(new AppError('Please confirm youre email',403,'failed'))
    const matchPassword = bcrypt.compareSync(password,user.password)
  if(!matchPassword) return next(new AppError('Invalid email or password',422,'failed'))
  const accessToken = generateAccessToken(user.email,user.role)
  const refreshToken = generateRefreshToken(user.email)
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000, // 15 minutes
    sameSite: 'Strict',
    secure: isProduction 
  });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: 'Strict',
    secure: isProduction 
  });

  user.password = undefined;
  
  res.status(200).json({
    data: user,
    statusMessage: 'User logged in successfully'
  });

})

export const logout = catchError(async(req,res,next)=>{
  res.clearCookie('accessToken')
  res.clearCookie('refreshToken')
  return res.status(200).json({
    statusMessage:'User logged out successfully'
  })
})

export const verifyEmail = catchError(async (req, res, next) => {
  const { token } = req.params;

  jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
    if (error) {
      return next(new AppError(error.message, 400, 'failed'));
    }
    const user = await User.findByIdAndUpdate(
      decoded.id,
      { confirmEmail: true },
      { new: true }
    );

    if (!user) {
      return next(new AppError('User not found', 400, 'failed'));
    }

    user.password = undefined;

    res.status(200).json({
      statusMessage: 'Email verified successfully',
    });
  });
});


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
      statusMessage:'Password reset successfully please login'
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