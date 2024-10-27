export class AppError extends Error {
    constructor(message,statusCode,statusMessage){
        super(message)
        this.message = message
        this.statusCode = statusCode
        this.statusMessage = statusMessage
    }
}


export const catchError = (fn)=>{
    return async(req,res,next)=>{
        try{
            await fn(req,res,next)
        }catch(error){
            next(new AppError(error.message, error.statusCodex, error.statusMessage))
        }
    }
}