import Joi from "joi";

export const addPropertySchema = Joi.object({
    typeOfProperty:Joi.string().valid('apartment', 'room', 'villa', 'stdio').required().messages({
        "any.required": "Property type is required",
        "string.pattern.base": "Property type must be one of the following: apartment, room, villa, stdio"
    }),
    description:Joi.string().min(5).max(10).required().messages({
        "any.required": "Description is required",
        "string.min": "Description must be at least 5 characters long",
        "string.max": "Description must be at most 10 characters long"
    }),
    typeOfPromotion:Joi.string().valid('sale', 'rent').required().messages({
        "any.required": "Type of promotion is required",
        "string.pattern.base": "Type of promotion must be one of the following: sale, rent"
    }),
    conditionOfProperty:Joi.string().valid('new', 'used', 'refurbished', 'pre-owned').required().messages({
        "any.required": "Condition of property is required",
        "string.pattern.base": "Condition of property must be one of the following: new, used, refurbished, pre-owned"
    }),
    beds: Joi.string().number().required().messages({
        "any.required": "Number of beds is required",
        "number.base": "Number of beds must be a number"
    }),
    bathrooms: Joi.number().required().messages({
        "any.required": "Number of bathrooms is required",
        "number.base": "Number of bathrooms must be a number"
    }),
    holes: Joi.number().required().messages({
        "any.required": "Number of holes is required",
        "number.base": "Number of holes must be a number"
    }),
    size:Joi.number().required().messages({
        "any.required": "Size is required",
        "number.base": "Size must be a number"
    }),
    features: Joi.array().items(
        Joi.object({
            featureName: Joi.string().valid('security', 'cctv', 'parking', 'Central air conditioning', 'gym').required().messages({
                "any.required": "Feature name is required",
                "string.pattern.base": "Feature name must be one of the following: security, cctv, parking, central air conditioning, gym"
            }),
            featureValue: Joi.boolean().required()
        })
    ),
    price: Joi.number().min(1).required().messages({
        "any.required": "Price is required",
        "number.min": "Price must be at least 1"
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
    }).required()
});



export const updatePropertySchema = Joi.object({
    typeOfProperty:Joi.string().valid('apartment', 'room', 'villa', 'stdio').messages({
        "string.pattern.base": "Property type must be one of the following: apartment, room, villa, stdio"
    }),
    description:Joi.string().min(5).max(10).messages({
        "string.min": "Description must be at least 5 characters long",
        "string.max": "Description must be at most 10 characters long"
    }),
    typeOfPromotion:Joi.string().valid('sale', 'rent').messages({
        "string.pattern.base": "Type of promotion must be one of the following: sale, rent"
    }),
    conditionOfProperty:Joi.string().valid('new', 'used', 'refurbished', 'pre-owned').messages({
        "string.pattern.base": "Condition of property must be one of the following: new, used, refurbished, pre-owned"
    }),
    beds: Joi.string().number().messages({
        "number.base": "Number of beds must be a number"
    }),
    bathrooms: Joi.number().messages({
        "number.base": "Number of bathrooms must be a number"
    }),
    holes: Joi.number().messages({
        "number.base": "Number of holes must be a number"
    }),
    size:Joi.number().messages({
        "number.base": "Size must be a number"
    }),
    features: Joi.array().items(
        Joi.object({
            featureName: Joi.string().valid('security', 'cctv', 'parking', 'Central air conditioning', 'gym').required().messages({
                "any.required": "Feature name is required",
                "string.pattern.base": "Feature name must be one of the following: security, cctv, parking, central air conditioning, gym"
            }),
            featureValue: Joi.boolean().required()
        })
    ),
    price: Joi.number().min(1).messages({
        "number.min": "Price must be at least 1"
    }),
    emirate:Joi.string().valid('Abu Dhabi','Dubai', 'Sharjah','Ajman', 'Umm Al Quwain','Ras Al Khaimah','Fujairah').required().messages({
        "any.required": "Emirate is required",
        "string.pattern.base": "Emirate must be one of the following: Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, Fujairah"
    }),
    neighborhood:Joi.string().required().messages({
        "any.required": "Neighborhood is required",
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
    id:Joi.string().hex().length(24).required().messages({
        "string.hex": "ID must be a valid hex string",
        "string.length": "ID must be a 24-character hex string",
        "any.required": "ID is required"
    })
})



