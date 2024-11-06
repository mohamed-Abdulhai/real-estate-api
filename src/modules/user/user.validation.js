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


export const changeRoleSchema = Joi.object({
    id: Joi.string().hex().length(24).required().messages({
        "string.hex": "ID must be a valid hex string",
        "string.length": "ID must be a 24-character hex string",
        "any.required": "ID is required"
    }),
    role:Joi.number().valid(10,20).required().messages({
        "any.required": "new role is required",
        "number.valid": "Invalid role only 10,20"
    })
})


export const getAllUsersSchema = Joi.object({
    page: Joi.number()
        .integer()
        .min(1)
        .messages({
            'number.base': 'Page must be a number',
            'number.integer': 'Page must be an integer',
            'number.min': 'Page must be at least 1'
        }),
    limit: Joi.number()
        .integer()
        .min(1)
        .max(100)
        .messages({
            'number.base': 'Limit must be a number',
            'number.integer': 'Limit must be an integer',
            'number.min': 'Limit must be at least 1',
            'number.max': 'Limit cannot exceed 100'
        }),
    sortBy: Joi.string()
        .valid('firstName', 'lastName', 'email', 'phone', 'createdAt', 'updatedAt')
        .messages({
            'string.base': 'SortBy must be a string',
            'any.only': 'SortBy must be one of: firstName, lastName, email, phone, createdAt, updatedAt'
        }),
    sortOrder: Joi.string()
        .valid('asc', 'desc')
        .messages({
            'string.base': 'SortOrder must be a string',
            'any.only': 'SortOrder must be either "asc" or "desc"'
        }),
    search: Joi.string()
        .allow('')
        .trim()
        .messages({
            'string.base': 'Search must be a string'
        })
});
