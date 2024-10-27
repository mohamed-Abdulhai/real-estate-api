import { createHandler } from '../../handlers/handler.js'
import {AppError,catchError} from '../../utilities/error/error.js'
import {User} from '../../../DB/models/user.model.js'

export const register = createHandler(User)

export const login = catchError(async(req,res,next)=>{


})

export const logout = catchError(async(req,res,next)=>{

})

export const verifyEmail = catchError(async(req,res,next)=>{

})

export const forgotPassword = catchError(async(req,res,next)=>{

})

export const resetPassword = catchError(async(req,res,next)=>{

})

export const changePassword = catchError(async(req,res,next)=>{

})

