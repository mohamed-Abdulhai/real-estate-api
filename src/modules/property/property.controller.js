import path from 'path'
import fs from 'fs'
import {Property} from '../../../DB/models/property.model.js'
import {   getSingleHandler } from "../../handlers/handler.js";
import { catchError } from "../../utilities/error/error.js";
import cloudinary from '../../utilities/fileUpload/cloudinary.js'

export const addProperty = catchError(async (req, res, next) => {
    let uploadedImages = [];

    if (req.files) {
        try {
            uploadedImages = await Promise.all(req.files.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, {
                    resource_type: "image"  
                });
                fs.unlinkSync(file.path);  
                return {
                    public_id: result.public_id,
                    secure_url: result.secure_url,
                };
            }));
        } catch (error) {
            return next(new AppError("Image upload failed", 500, "failed"));
        }
    }

    const property = new Property({
        ...req.body,
        addedBy: req.user.id,
        images: uploadedImages.map(upload => ({
            publicId: upload.public_id,
            imageUrl: upload.secure_url
        })),
    });

    await property.save();

    return res.status(201).json({
        statusMessage: "success",
        message: "Property added successfully",
        data: { property },
    });
});


export const updateProperty = catchError(async (req, res, next) => {
    const { id } = req.params;

    let property = await Property.findById(id);
    if (!property) {
        return res.status(404).json({ message: "Property not found" });
    }

    let updatedImages = [];
    if (req.files) {
        await Promise.all(
            property.images.map(async (img) => {
                try {
                    await cloudinary.uploader.destroy(img.publicId);
                } catch (err) {
                    console.error(`Error deleting image with ID ${img.publicId}:`, err);
                }
            })
        );

        updatedImages = await Promise.all(
            req.files.map(async (file) => {
                try {
                    const result = await cloudinary.uploader.upload(file.path, {
                        resource_type: "image" // Ensure only images are allowed
                    });
                    fs.unlinkSync(file.path); // Remove file after upload
                    return {
                        publicId: result.public_id,
                        imageUrl: result.secure_url,
                    };
                } catch (err) {
                    console.error("Error uploading image:", err);
                    throw err;
                }
            })
        );
    }

    // Update the property with new data and images (if provided)
    property = await Property.findByIdAndUpdate(
        id,
        {
            ...req.body,
            images: updatedImages.length > 0 ? updatedImages : property.images,
        },
        { new: true }
    );

    return res.status(200).json({
        statusMessage: "success",
        message: "Property updated successfully",
        data: { property },
    });
});



export const deleteAllProperties = catchError(async (req, res, next) => {
    const properties = await Property.find();

    await Promise.all(
        properties.flatMap((property) =>
            property.images.map((img) => cloudinary.uploader.destroy(img.publicId))
        )
    );

    
    await Property.deleteMany();

    return res.status(200).json({
        statusMessage: "success",
        message: "All properties deleted successfully",
    });
});

export const deleteProperty = catchError(async (req, res, next) => {
    const { id } = req.params;

    const property = await Property.findById(id);
    if (!property) {
        return res.status(404).json({ message: "Property not found" });
    }

   
    await Promise.all(
        property.images.map((img) => cloudinary.uploader.destroy(img.publicId))
    );

    await Property.findByIdAndDelete(id);

    return res.status(200).json({
        statusMessage: "success",
        message: "Property deleted successfully",
    });
});


export const getProperty = getSingleHandler(Property)

export const getAllProperties = catchError(async (req, res, next) => {
    

    const {
        page,
        limit,
        sortBy,
        sortOrder,
        maxDistance,
        location,
        ...filters 
    } = value;

    if (location && maxDistance) {
        filters.location = {
            $geoWithin: {
                $centerSphere: [location, maxDistance / 6378100] 
            }
        };
    }

    const options = {
        page,
        limit,
        sort: { [sortBy]: sortOrder === 'asc' ? 1 : -1 },
        populate: { path: 'addedBy', select: 'firstName lastName email' }
    };

    const properties = await Property.paginate(filters, options);

    res.status(200).json({
        success: true,
        data: properties.docs,
        pagination: {
            totalDocs: properties.totalDocs,
            totalPages: properties.totalPages,
            page: properties.page,
            limit: properties.limit,
        }
    });
});