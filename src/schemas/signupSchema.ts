import Joi from "joi";
import { CreateUserData } from "../services/userServices.js";

export const signupSchema = Joi.object<CreateUserData>({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});