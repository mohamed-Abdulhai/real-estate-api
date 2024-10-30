import { Router } from "express";
import authRouter from '../modules/auth/auth.router.js'
import userRouter from '../modules/user/user.router.js'
import propertyRouter from '../modules/property/property.router.js'
import analysisRouter from '../modules/analysis/analysis.router.js'

const router = Router()

router.use('/auth',authRouter)

router.use('/users',userRouter)

router.use('/properties',propertyRouter)

router.use('/analysis',analysisRouter)





export default router