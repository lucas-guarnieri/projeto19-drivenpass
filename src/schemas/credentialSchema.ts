import Joi from "joi";

export const credentialSchema = Joi.object({
    title: Joi.string().required(),
    url: Joi.string().uri().required(),
    userName: Joi.string().required(),
    userPassword: Joi.string().required(),
});