import { User } from "../../../DB/models/user.model.js";
import { catchError } from "../../utilities/error/error.js";

export const userAnalysis = catchError(async(req,res,next)=>{
    const usersCount = await User.find().countDocuments()

    return res.status(200).json({
        message: `Total users: ${usersCount}`,
        statusMessage: "success"
    })
})

export const propertyAnalysis = catchError(async(req,res,next)=>{
    const propertiesCount = await Property.find().countDocuments()

    return res.status(200).json({
        message: `Total properties: ${propertiesCount}`,
        statusMessage: "success"
    })
})
