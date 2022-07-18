import Joi from "joi";

export const wifiSchema = Joi.object({
    title: Joi.string().required(),
    wifiName: Joi.string().required(),
    password: Joi.string().required()
});