import { Property } from "../../../DB/models/property.model.js";
import { catchError } from "../../utilities/error/error.js";

export const parseLocation = catchError(async (req, res, next) => {
    if (req.body.location) {
        
        req.body.location = JSON.parse(req.body.location);
    }
    next();
});

export const isAdminOrAddByUser = catchError(async (req, res, next) => {
    const id = req.params.id;
    const property = await Property.findById(id);
    
    if (!property) return next(new AppError('Property not found', 404, 'failed'));
    
    if (req.user.role !== 20 && req.user.id !== property.addedBy) {
        return next(new AppError('Unauthorized', 403, 'failed'));
    }
    
    next();
});
