import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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

export const generateAccessToken = (id,role)=>{
    const accessToken = jwt.sign({id,role},process.env.ACCESS_TOKEN_SECRET_KEY,{subject:'accessToken',expiresIn:'15m'})
    return accessToken
}

export const generateRefreshToken = (id,role)=>{
    const refreshToken = jwt.sign({id,role},process.env.REFRESH_TOKEN_SECRET_KEY,{subject:'refreshToken',expiresIn:'7d'})
    return refreshToken
}

export  const generateConfrmToken = (id,email)=>{
    const confirmToken = jwt.sign({id,email},process.env.SECRET_KEY,{subject:'confirmToken',expiresIn:'24h'})
    return confirmToken
}

export const authentication = catchError(async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) return next(new AppError('Unauthorized', 401, 'failed'));

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY, async(error, decoded) => {
        if (error) return next(new AppError('Invalid token or expired', 401, 'failed'));
        const {id} = decoded
        const user = await User.findById(id)
        if (!user) return next(new AppError('User was deleted or not found', 404, 'failed'));
        req.user = decoded;
        next();
    });
});

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('Unauthorized', 403, 'failed'));
        }
        next();
    };
};