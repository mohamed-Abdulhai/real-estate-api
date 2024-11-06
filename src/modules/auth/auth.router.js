import { Router } from "express";
import { changePassword, checkAuth, checkAuthByRole, forgotPassword, login, logout, refreshToken, register, resetPassword, verifyEmail } from "./auth.controller.js";
import {validate} from '../../middlewares/validate.js'
import { changePasswordSchema, forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema, verifyEmailSchema } from './auth.validation.js'
import { authentication, authorize, findTheExistEmail, findTheExistPhone, hashPassword } from "./auth.middleware.js";
import {Role} from '../../utilities/enum/enumRole.js'
const router = Router()

router.post('/register',validate(registerSchema),findTheExistEmail,findTheExistPhone,hashPassword,register)
router.post('/login',validate(loginSchema),login)
router.post('/logout',logout)
router.get('/verify-email/:token',validate(verifyEmailSchema),verifyEmail)
router.post('/refresh-token',refreshToken)
router.post('/forgot-password', validate(forgotPasswordSchema),forgotPassword)
router.put('/reset-password/:token', validate(resetPasswordSchema),hashPassword,resetPassword)
router.put('/change-password',authentication,validate(changePasswordSchema),hashPassword,changePassword)
router.get('/check-auth',authentication,checkAuth)
router.get('/check-auth-admin', authentication, authorize(Role.ADMIN), checkAuthByRole);

export default router