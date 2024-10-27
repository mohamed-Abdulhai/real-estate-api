import { Router } from "express";
import { deleteAllUsers, deleteUser, getAllUsers, getUser, updateUser } from './user.controller.js'
import { validate } from '../../middlewares/validate.js'
import { mongodbObjectIdSchema } from "../../globalValidation/global.validation.js";

const router = Router()

router.route('/')
.get(getAllUsers)
.delete(deleteAllUsers)

router.route('/:id')
.get(validate(mongodbObjectIdSchema),getUser)
.put(updateUser)
.delete(validate(mongodbObjectIdSchema),deleteUser)

export default router