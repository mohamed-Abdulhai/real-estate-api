import Joi from "joi";

export const addPropertySchema = Joi.object({
    typeOfProperty: Joi.string().valid('apartment', 'room', 'villa', 'studio').required().messages({
        "any.required": "Property type is required",
        "any.only": "Property type must be one of the following: apartment, room, villa, studio"
    }),
    description: Joi.string().min(5).max(1000).required().messages({
        "any.required": "Description is required",
        "string.min": "Description must be at least 5 characters long",
        "string.max": "Description must be at most 1000 characters long"
    }),
    typeOfPromotion: Joi.string().valid('sale', 'rent').required().messages({
        "any.required": "Type of promotion is required",
        "any.only": "Type of promotion must be one of the following: sale, rent"
    }),
    conditionOfProperty: Joi.string().valid('new', 'used', 'refurbished', 'pre-owned').required().messages({
        "any.required": "Condition of property is required",
        "any.only": "Condition of property must be one of the following: new, used, refurbished, pre-owned"
    }),
    beds: Joi.number().min(0).required().messages({
        "any.required": "Number of beds is required",
        "number.base": "Number of beds must be a number",
        "number.min": "Number of Equity must be a number"
    }),
    bathrooms: Joi.number().min(0).required().messages({
        "any.required": "Number of bathrooms is required",
        "number.base": "Number of bathrooms must be a number",
        "number.min": "Number of Equity must be a number"
    }),
    holes: Joi.number().min(0).required().messages({
        "any.required": "Number of holes is required",
        "number.base": "Number of holes must be a number",
        "number.min": "Number of Equity must be a number"
    }),
    size: Joi.number().min(0).required().messages({
        "any.required": "Size is required",
        "number.base": "Size must be a number",
        "number.min": "Number of Equity must be a number"
    }),
    price: Joi.number().min(0).min(1).required().messages({
        "any.required": "Price is required",
        "number.min": "Price must be at least 1",
        "number.min": "Number of Equity must be a number"
    }),
    location: Joi.object({
        type: Joi.string().valid('Point').required(),
        coordinates: Joi.array()
            .items(Joi.number())
            .length(2)
            .required()
            .messages({
                'array.length': 'Coordinates must have [longitude, latitude]',
                'number.base': 'Coordinates must be numbers',
                'number.empty': 'Coordinates cannot be empty'
            })
    }).required(),
    emirate: Joi.string().valid('Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah').required().messages({
        "any.required": "Emirate is required",
        "any.only": "Emirate must be one of the following: Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, Fujairah"
    }),
    neighborhood: Joi.string().required().messages({
        "any.required": "Neighborhood is required"
    }),
});

export const updatePropertySchema = Joi.object({
    typeOfProperty: Joi.string().valid('apartment', 'room', 'villa', 'studio').messages({
        "any.only": "Property type must be one of the following: apartment, room, villa, studio"
    }),
    description: Joi.string().min(5).max(1000).messages({
        "string.min": "Description must be at least 5 characters long",
        "string.max": "Description must be at most 1000 characters long"
    }),
    typeOfPromotion: Joi.string().valid('sale', 'rent').messages({
        "any.only": "Type of promotion must be one of the following: sale, rent"
    }),
    conditionOfProperty: Joi.string().valid('new', 'used', 'refurbished', 'pre-owned').messages({
        "any.only": "Condition of property must be one of the following: new, used, refurbished, pre-owned"
    }),
    beds: Joi.number().messages({
        "number.base": "Number of beds must be a number"
    }),
    bathrooms: Joi.number().messages({
        "number.base": "Number of bathrooms must be a number"
    }),
    holes: Joi.number().messages({
        "number.base": "Number of holes must be a number"
    }),
    size: Joi.number().messages({
        "number.base": "Size must be a number"
    }),
    features: Joi.array().items(
        Joi.object({
            featureName: Joi.string().valid('security', 'cctv', 'parking', 'Central air conditioning', 'gym').required().messages({
                "any.required": "Feature name is required",
                "any.only": "Feature name must be one of the following: security, cctv, parking, Central air conditioning, gym"
            }),
            featureValue: Joi.boolean().required()
        })
    ),
    price: Joi.number().min(1).messages({
        "number.min": "Price must be at least 1"
    }),
    emirate: Joi.string().valid('Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah').messages({
        "any.only": "Emirate must be one of the following: Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, Fujairah"
    }),
    neighborhood: Joi.string().messages({
        "string.base": "Neighborhood must be a string value"
    }),
    location: Joi.object({
        type: Joi.string().valid('Point').required(),
        coordinates: Joi.array()
            .items(Joi.number())
            .length(2)
            .required()
            .messages({
                'array.length': 'Coordinates must have [longitude, latitude]',
                'number.base': 'Coordinates must be numbers',
                'number.empty': 'Coordinates cannot be empty'
            })
    }),
    id: Joi.string().hex().length(24).required().messages({
        "string.hex": "ID must be a valid hex string",
        "string.length": "ID must be a 24-character hex string",
        "any.required": "ID is required"
    })
});

const getAllPropertiesSchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sortBy: Joi.string().valid('price', 'size', 'beds', 'bathrooms', 'createdAt').default('createdAt'),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
    typeOfProperty: Joi.string().valid('apartment', 'room', 'villa', 'studio'),
    typeOfPromotion: Joi.string().valid('sale', 'rent'),
    conditionOfProperty: Joi.string().valid('new', 'used', 'refurbished', 'pre-owned'),
    emirate: Joi.string().valid('Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah'),
    neighborhood: Joi.string(),
    maxDistance: Joi.number(), 
    location: Joi.array().items(Joi.number()).length(2) 
});