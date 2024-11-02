import Joi from 'joi';

export const registerSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Invalid email format'
    }),
    password: Joi.string().min(8).max(30)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)
        .required()
        .messages({
            'any.required': 'Password is required',
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password must be at most 30 characters long',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    }),
    phone: Joi.string().pattern(/^(?:\+971|00971|971|0)?(?:50|51|52|54|55|56|2|3|4|6|7|9)\d{7}$/m).required().messages({
        'any.required': 'Phone is required',
        'string.pattern.base': 'Invalid UAE phone number'
    }),
    firstName: Joi.string().min(3).max(32).required().messages({
        'any.required': 'First name is required',
        'string.min': 'First name must be at least 3 characters long',
        'string.max': 'First name must be at most 32 characters long'
    }),
    lastName: Joi.string().min(3).max(32).required().messages({
        'any.required': 'Last name is required',
        'string.min': 'Last name must be at least 3 characters long',
        'string.max': 'Last name must be at most 32 characters long'
    }),
    typeOfUser: Joi.string().valid('agent', 'developer', 'owner').required().messages({
        'any.required': 'Type of user is required',
        'any.only': 'Invalid type of user'
    })
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Invalid email format'
    }),
    password: Joi.string().min(8).max(30)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)
        .required()
        .messages({
            'any.required': 'Password is required',
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password must be at most 30 characters long',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    })
});

export const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Invalid email format'
    })
});

export const changePasswordSchema = Joi.object({
    oldPassword: Joi.string().min(8).max(30)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)
        .required()
        .messages({
            'any.required': 'Old password is required',
            'string.min': 'Old password must be at least 8 characters long',
            'string.max': 'Old password must be at most 30 characters long',
            'string.pattern.base': 'Old password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    }),
    password: Joi.string().min(8).max(30)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)
        .required()
        .messages({
            'any.required': 'Password is required',
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password must be at most 30 characters long',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    })
});

export const verifyEmailSchema = Joi.object({
    token: Joi.string().required().messages({
        'any.required': 'Token is required'
    })
});

export const resetPasswordSchema = Joi.object({
    token: Joi.string().required().messages({
        'any.required': 'Token is required'
    }),
    password: Joi.string().min(8).max(30)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)
        .required()
        .messages({
            'any.required': 'Password is required',
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password must be at most 30 characters long',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    })
});
