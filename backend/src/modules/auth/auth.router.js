import { Router } from "express";
import { changePassword, forgotPassword, login, logout, register, resetPassword, verifyEmail } from "./auth.controller.js";
import {validate} from '../../middlewares/validate.js'
import { changePasswordSchema, forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema, verifyEmailSchema } from './auth.validation.js'
const router = Router()

router.post('/register',validate(registerSchema),register)
router.post('/login',validate(loginSchema),login)
router.post('/logout',logout)
router.get('/verify-email/:token',validate(verifyEmailSchema),verifyEmail)
router.post('/forgot-password', validate(forgotPasswordSchema),forgotPassword)
router.post('/reset-password/:token', validate(resetPasswordSchema),resetPassword)
router.put('change-password',validate(changePasswordSchema),changePassword)




export default router