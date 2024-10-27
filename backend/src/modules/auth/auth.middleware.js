import bcrypt from 'bcrypt'
import { catchError } from '../../utilities/error/error.js'
export const hashPassword = catchError(async (req,res,next) => {
    const hashedPassword = bcrypt.hashSync(req.body.password,Number(process.env.SALT))
    req.body.password = hashedPassword
    next()
})


