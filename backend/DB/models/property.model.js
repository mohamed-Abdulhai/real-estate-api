import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const schema = new mongoose.Schema({
    typeofProperty: {
        type: String,
        enum: ['apartment', 'room', 'penthouse', 'townhouse', 'factory', 'villa', 'farmhouse', 'building', 'tower', 'commercial', 'land', 'other'],
        required: true
    },
    typeOfPromotion: {
        type: String,
        enum: ['sale', 'rent', 'lease'],
        required: true
    },
    conditionOfProperty: {
        type: String,
        enum: ['new', 'used', 'refurbished', 'pre-owned'],
        required: true
    },
    features: [
        {
            featureName: {
                type: String,
                enum: ['security', 'cctv', 'parking', 'Central air conditioning', 'gym']
            },
            featureValue: Boolean
        }
    ],
    price: {
        type: Number,
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
}, { discriminatorKey: 'typeofProperty' });


const Apartment = Property.discriminator('apartment', new mongoose.Schema({
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    area: { type: Number, required: true }
}));

const Room = Property.discriminator('room', new mongoose.Schema({
    area: { type: Number, required: true },
    sharedBathroom: { type: Boolean, default: true }
}));

const Penthouse = Property.discriminator('penthouse', new mongoose.Schema({
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    terraceArea: { type: Number, required: true }
}));

const Townhouse = Property.discriminator('townhouse', new mongoose.Schema({
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    floors: { type: Number, required: true }
}));

const Factory = Property.discriminator('factory', new mongoose.Schema({
    area: { type: Number, required: true },
    capacity: { type: Number, required: true }
}));

const Villa = Property.discriminator('villa', new mongoose.Schema({
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    gardenArea: { type: Number, required: true },
    pool: { type: Boolean, default: false }
}));

const Farmhouse = Property.discriminator('farmhouse', new mongoose.Schema({
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    landArea: { type: Number, required: true }
}));

const Building = Property.discriminator('building', new mongoose.Schema({
    floors: { type: Number, required: true },
    units: { type: Number, required: true }
}));

const Tower = Property.discriminator('tower', new mongoose.Schema({
    floors: { type: Number, required: true },
    officeSpaces: { type: Number, required: true }
}));

const Commercial = Property.discriminator('commercial', new mongoose.Schema({
    floorArea: { type: Number, required: true },
    parkingSpaces: { type: Number }
}));

const Land = Property.discriminator('land', new mongoose.Schema({
    landSize: { type: Number, required: true },
    zoningType: { type: String }
}));

schema.index({ location: '2dsphere' });
schema.plugin(mongoosePaginate);

const Property = mongoose.model('property', schema);

export { Property, Apartment, Room, Penthouse, Townhouse, Factory, Villa, Farmhouse, Building, Tower, Commercial, Land };