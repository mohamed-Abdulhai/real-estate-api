import { Router } from "express";
import {  deleteAllUsers, deleteUser, getAllUsers, getUser, updateUser } from './user.controller.js'
import { validate } from '../../middlewares/validate.js'
import { mongodbObjectIdSchema } from "../../globalValidation/global.validation.js";
import { authentication, authorize } from '../auth/auth.middleware.js'
import {Role} from '../../utilities/enum/enumRole.js'
import { changeRoleSchema, getAllUsersSchema, updateUserSchema } from "./user.validation.js";
import { isProfileUser, isTheUserOrAdmin } from "./user.middleware.js";

const router = Router()

router.route('/')
.get(authentication,authorize(Role.ADMIN),validate(getAllUsersSchema),getAllUsers)
.delete(authentication,authorize(Role.ADMIN),deleteAllUsers)

router.get('/profile/:id',authentication,authorize(Role.ADMIN,Role.USER) ,isProfileUser,validate(mongodbObjectIdSchema), getUser)

router.put('/change-role/:id',authentication,authorize(Role.ADMIN),validate(changeRoleSchema),updateUser)

router.route('/:id')
.get(authentication,authorize(Role.ADMIN),validate(mongodbObjectIdSchema),getUser)
.put(authentication,authorize(Role.ADMIN,Role.USER),isTheUserOrAdmin,validate(updateUserSchema),updateUser)
.delete(authentication,authorize(Role.ADMIN,Role.USER),isTheUserOrAdmin,validate(mongodbObjectIdSchema),deleteUser)

export default router