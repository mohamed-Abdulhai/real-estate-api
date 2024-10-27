import Joi from 'joi'

export const registerSchema = Joi.object({
    email:Joi.string().email().required().messages({
        'email.required': 'Email is required',
        'email.email': 'Invalid email format'
    }),
    password:Joi.string().min(8).max(30).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/).required().messages({
        'password.required': 'Password is required',
        'password.min': 'Password must be at least 8 characters long',
        'password.max': 'Password must be at most 30 characters long',
        'password.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    }),
    phone: Joi.string().pattern(/^(?:\+971|00971|971|0)?(?:50|51|52|54|55|56|2|3|4|6|7|9)\d{7}$/m).required().messages({
        'phone.required': 'Phone is required',
        'phone.pattern.base':  'Invalid UAE phone number'
    }),

    firstName:Joi.string().min(3).max(32).required().messages({
        'firstName.required': 'First name is required',
        'firstName.min': 'First name must be at least 3 characters long',
        'firstName.max': 'First name must be at most 32 characters long'
    }),
    lastName: Joi.string().min(3).max(32).required().messages({
        'lastName.required': 'Last name is required',
        'lastName.min': 'Last name must be at least 3 characters long',
        'lastName.max': 'Last name must be at most 32 characters long'
    }),
    typeOfUser:Joi.string().valid('agent', 'developer', 'owner').required().messages({
        'typeOfUser.required': 'Type of user is required',
        'typeOfUser.valid': 'Invalid type of user'
    })

})

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'email.required': 'Email is required',
        'email.email': 'Invalid email format'
    }),
    password: Joi.string().min(8).max(30).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/).required().messages({
        'password.required': 'Password is required',
        'password.min': 'Password must be at least 8 characters long',
        'password.max': 'Password must be at most 30 characters long',
        'password.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    })
})

export const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'email.required': 'Email is required',
        'email.email': 'Invalid email format'
    })
})

export const changePasswordSchema = Joi.object({
    oldPassword: Joi.string().min(8).max(30).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/).required().messages({
        'oldPassword.required': 'Old password is required',
        'oldPassword.min': 'Old password must be at least 8 characters long',
        'oldPassword.max': 'Old password must be at most 30 characters long',
        'oldPassword.pattern.base': 'Old password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    }),
    password: Joi.string().min(8).max(30).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/).required().messages({
        'password.required': 'Password is required',
        'password.min': 'Password must be at least 8 characters long',
        'password.max': 'Password must be at most 30 characters long',
        'password.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'confirmPassword.required': 'Confirm password is required',
        'confirmPassword.valid': 'Confirm password must match Password'
    })
})

export const verifyEmailSchema = Joi.object({
    token: Joi.string().required().messages({
        'token.required': 'Token is required'
    })
})

export const resetPasswordSchema = Joi.object({
    token: Joi.string().required().messages({
        'token.required': 'Token is required'
    }),
    password: Joi.string().min(8).max(30).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/).required().messages({
        'password.required': 'Password is required',
        'password.min': 'Password must be at least 8 characters long',
        'password.max': 'Password must be at most 30 characters long',
        'password.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    }),
})