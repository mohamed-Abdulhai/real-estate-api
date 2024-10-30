import { User } from "../../../DB/models/user.model.js";
import {Property} from '../../../DB/models/property.model.js'
import { analsizeHandler } from "../../handlers/handler.js";

export const userAnalysis = analsizeHandler(User)

export const propertyAnalysis = analsizeHandler(Property)
