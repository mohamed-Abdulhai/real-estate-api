import { Router } from "express";
import { addProperty, deleteAllProperties, deleteProperty, getAllProperties, getProperty, updateProperty } from "./property.controller.js";
import { validate } from "../../middlewares/validate.js";
import { mongodbObjectIdSchema } from "../../globalValidation/global.validation.js";

const router = Router()

router.route('/')
    .post(addProperty)
    .get(getAllProperties)
    .delete(deleteAllProperties)
router.route('/:id')
    .get(validate(mongodbObjectIdSchema),getProperty)
    .put(updateProperty)
    .delete(validate(mongodbObjectIdSchema),deleteProperty)




export default router