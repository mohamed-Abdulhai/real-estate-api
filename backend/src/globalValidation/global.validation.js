import Joi from "joi";

export const mongodbObjectIdSchema = Joi.object({
    id:Joi.string().hex().length(24).required().messages({
        "string.hex": "Invalid ObjectId",
        "string.length": "Invalid ObjectId",
        "any.required": "id is required",
    })
})