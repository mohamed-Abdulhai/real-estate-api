import { Router } from "express";
import { propertyAnalysis, userAnalysis } from "./analysis.controller.js";
import { authentication, authorize } from "../auth/auth.middleware.js";
import { Role } from "../../utilities/enum/enumRole.js";

const router = Router()

router.get('/users',authentication,authorize(Role.ADMIN),userAnalysis)
router.get('/properties',authentication,authorize(Role.ADMIN),propertyAnalysis)


export default router