export class AppError extends Error {
    constructor(message,statusCode,statusMessage){
        super(message)
        this.message = message
        this.statusCode = statusCode
        this.statusMessage = statusMessage
    }
}


export const catchError= (fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch((error)=>next(error))
    }
}