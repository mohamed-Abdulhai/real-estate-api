import {  deleteAllHandler, deleteSingleHandler } from '../../handlers/handler.js'
import {User} from '../../../DB/models/user.model.js'
import { AppError, catchError } from '../../utilities/error/error.js'

export const updateUser = catchError(async (req,res,next)=>{
    const {id} = req.params
    const user = await User.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
    if(!user) return next(new AppError('User not found',404,'failed'))
        user.password = undefined
    
    res.status(200).json({
        status:'success',
        data:user
    })
})

export const getAllUsers = catchError(async (req, res, next) => {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', search } = req.query;

    const query = {};
    if (search) {
        query.$or = [
            { firstName: new RegExp(search, 'i') },
            { lastName: new RegExp(search, 'i') },
            { email: new RegExp(search, 'i') },
            { phone: new RegExp(search, 'i') }
        ];
    }

    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort,
     
    };

    const users = await User.paginate(query, options);

    res.status(200).json({
        success: true,
        message: 'Users retrieved successfully',
        data: users
    });
});


export const deleteUser = deleteSingleHandler(User)

export const getUser = catchError(async (req,res,next)=>{
    const {id} = req.params
    const user = await User.findById(id)
    if(!user) return next(new AppError('User not found',404,'failed'))
    user.password = undefined
    res.status(200).json({
        status:'success',
        data:user
    })
})

export const deleteAllUsers = deleteAllHandler(User)

