import { Router } from "express";
import { addProperty, deleteAllProperties, deleteProperty, getAllProperties, getProperty, updateProperty } from "./property.controller.js";
import { validate } from "../../middlewares/validate.js";
import { mongodbObjectIdSchema } from "../../globalValidation/global.validation.js";
import { addPropertySchema, updatePropertySchema } from "./property.validation.js";
import { authentication, authorize } from "../auth/auth.middleware.js";
import { Role } from "../../utilities/enum/enumRole.js";
import { upload } from "../../utilities/fileUpload/upload.js";
import { isAdminOrAddByUser, parseLocation } from "./property.middleware.js";

const router = Router()

router.route('/')
    .post(authentication,upload.array('images',{maxCount:5}),parseLocation,validate(addPropertySchema),addProperty)  
    .get(getAllProperties)
    .delete(authentication,authorize(Role.ADMIN),deleteAllProperties)
router.route('/:id')
    .get(validate(mongodbObjectIdSchema),getProperty)
    .put(authentication,isAdminOrAddByUser,upload.array('images',{maxCount:5}),validate(updatePropertySchema),updateProperty)
    .delete(authentication,isAdminOrAddByUser,validate(mongodbObjectIdSchema),deleteProperty)
export default router