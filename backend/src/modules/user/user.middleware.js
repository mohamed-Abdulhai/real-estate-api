import { User } from "../../../DB/models/user.model.js";
import { Role } from "../../utilities/enum/enumRole.js";
import { AppError, catchError } from "../../utilities/error/error.js";

export const isTheUserOrAdmin = catchError(async (req, res, next) => {

    const user = await User.findById(req.params.id);
    if (!user) return next(new AppError('User not found', 404, 'failed'));

    if (req.user.role === Role.ADMIN || req.user.id === user._id) {
        return next();
    }

    next(new AppError('You are not authorized to perform this action', 403, 'failed'));
});

export const isProfileUser = catchError(async (req, res,next)=>{
    if(req.user.id === req.params.id) return next()
    next(new AppError('You are not authorized to view this user profile', 403, 'failed'))
})