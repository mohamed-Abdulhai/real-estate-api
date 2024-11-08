import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const schema = new mongoose.Schema({
    typeOfProperty: {
        type: String,
        enum: ['apartment', 'room', 'villa', 'studio'], 
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1000
    },
    typeOfPromotion: {
        type: String,
        enum: ['sale', 'rent'],
        required: true
    },
    conditionOfProperty: {
        type: String,
        enum: ['new', 'used', 'refurbished', 'pre-owned'],
        required: true
    },
    beds: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    holes: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: [{
        publicId: { 
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        }
    }],
    emirate: {
        type: String,
        enum: ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah']
    },
    neighborhood: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
            validate: {
                validator: function (val) {
                    return val.length === 2;
                },
                message: 'Coordinates must have [longitude, latitude]'
            }
        }
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, { timestamps: true });

schema.index({ location: '2dsphere' });
schema.plugin(mongoosePaginate);

export const Property = mongoose.model('property', schema);
