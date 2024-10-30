import {Property} from '../../../DB/models/property.model.js'
import { deleteAllHandler, deleteSingleHandler, getAllHandler, getSingleHandler, updateHandler } from "../../handlers/handler.js";
import { catchError } from "../../utilities/error/error.js";

export const addProperty = catchError(async (req,res,next)=>{

})

export const getProperty = getSingleHandler(Property)

export const getAllProperties = getAllHandler(Property)

export const updateProperty = updateHandler(Property)

export const deleteAllProperties = deleteAllHandler(Property)

export const deleteProperty = deleteSingleHandler(Property)
