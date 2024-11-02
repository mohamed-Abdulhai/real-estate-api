import { deleteAllHandler, deleteSingleHandler, getAllHandler, getSingleHandler, updateHandler } from '../../handlers/handler.js'
import {User} from '../../../DB/models/user.model.js'
import { catchError } from '../../utilities/error/error.js'
import { generateConfrmToken } from '../auth/auth.middleware.js'
import { sendEmail } from '../../utilities/error/email/confirmEmail/confirmEmail.js'
import { ConfirmEmailTemplate } from '../../utilities/error/email/confirmEmail/confirmEmailTemplate.js'

export const updateUser = catchError(async (req,res,next)=>{
    const {id} = req.params
    const user = await User.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
    if(!user) return next(new AppError('User not found',404,'failed'))
        user.password = undefined
    
    res.status(200).json({
        status:'success',
        data:user
    })
})

export const getAllUsers = getAllHandler(User)

export const deleteUser = deleteSingleHandler(User)

export const getUser = catchError(async (req,res,next)=>{
    const {id} = req.params
    const user = await User.findById(id)
    if(!user) return next(new AppError('User not found',404,'failed'))
    user.password = undefined
    res.status(200).json({
        status:'success',
        data:user
    })
})

export const deleteAllUsers = deleteAllHandler(User)