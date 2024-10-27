import { deleteAllHandler, deleteSingleHandler, getAllHandler, getSingleHandler, updateHandler } from '../../handlers/handler.js'
import {User} from '../../../DB/models/user.model.js'

export const updateUser = updateHandler(User)

export const getAllUsers = getAllHandler(User)

export const deleteUser = deleteSingleHandler(User)

export const getUser = getSingleHandler(User)

export const deleteAllUsers = deleteAllHandler(User)