import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import fs from 'fs';
import path from 'path';
import {rateLimit} from 'express-rate-limit'
import v1Router from './src/routers/v1Route.js'
import { AppError } from './src/utilities/error/error.js'
import { dbConnect } from './DB/db.config.js'
const app = express()

dotenv.config()

const port = process.env.port ||5000


dbConnect()
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max:100,
    message: 'Too many requests, please try again later.'
})

// Ensure the uploads directory exists
const uploadDir = path.join('uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware
app.use(express.json())
app.use(cors())
app.use(morgan(process.env.MOOD === 'development'? 'dev' : 'combined'))
app.use(cookieParser())
app.use(helmet())
app.use(limiter)

// Routes
app.use('/api/v1',v1Router)
app.use('*',(req,res,next)=>{
    next(new AppError('Route not found',404,'failed'))
})



app.use((error,req,res,next)=>{
    return res.status(error.statusCode ||500).json({
        message: error.message,statusMessage: error.statusMessage,
        stack: process.env.MOOD = 'development'?error.stack :''
    })
})

app.listen(port, () => console.log(`server is runing on port: ${port}`))