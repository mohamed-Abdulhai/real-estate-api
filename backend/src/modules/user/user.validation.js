import Joi from "joi";

export const updateUserSchema = Joi.object({
    id: Joi.string().hex().length(24).required().messages({
        "string.hex": "ID must be a valid hex string",
        "string.length": "ID must be a 24-character hex string",
        "any.required": "ID is required"
    }),
    
    phone: Joi.string().pattern(/^(?:\+971|00971|971|0)?(?:50|51|52|54|55|56|2|3|4|6|7|9)\d{7}$/m).messages({
        'string.pattern.base': 'Invalid UAE phone number'
    }),

    firstName: Joi.string().min(3).max(32).messages({
        'string.min': 'First name must be at least 3 characters long',
        'string.max': 'First name must be at most 32 characters long'
    }),
    lastName: Joi.string().min(3).max(32).messages({
        'string.min': 'Last name must be at least 3 characters long',
        'string.max': 'Last name must be at most 32 characters long'
    }),
    typeOfUser: Joi.string().valid('agent', 'developer', 'owner').messages({
        'any.only': 'Invalid type of user'
    })
});
