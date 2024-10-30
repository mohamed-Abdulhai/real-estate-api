import Joi from "joi";

export const mongodbObjectIdSchema = Joi.object({
    id:Joi.string().hex().length(24).required().messages({
        "string.hex": "ID must be a valid hex string",
        "string.length": "ID must be a 24-character hex string",
        "any.required": "ID is required"
    })
})