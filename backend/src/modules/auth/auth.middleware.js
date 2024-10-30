import bcrypt from 'bcrypt'
import { AppError, catchError } from '../../utilities/error/error.js'
import { User } from '../../../DB/models/user.model.js'
export const hashPassword = catchError(async (req,res,next) => {
    const hashedPassword = bcrypt.hashSync(req.body.password,Number(process.env.SALT))
    req.body.password = hashedPassword
    next()
})

export const findTheExistPhone = catchError(async (req,res,next)=>{
    const phone = req.body.phone
    const user = await User.findOne({phone})
    if(user){
        return next(new AppError('Phone number already exists',409,'failed'))
    }
    next()
})

export const findTheExistEmail = catchError(async (req,res,next)=>{
    const email = req.body.email
    const user = await User.findOne({email})
    if(user){
        return next(new AppError('Email already exists',409,'failed'))
    }
    next()
})
