import { Router } from "express";
import { propertyAnalysis, userAnalysis } from "./analysis.controller.js";

const router = Router()

router.get('/users',userAnalysis)
router.get('/properties',propertyAnalysis)


export default router