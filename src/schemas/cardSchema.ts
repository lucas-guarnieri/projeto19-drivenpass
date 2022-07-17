import Joi from "joi";
import { CARDTYPE } from "@prisma/client";
const cardType = [CARDTYPE.credit, CARDTYPE.debit]

export const cardSchema = Joi.object({
    title: Joi.string().required(),
    cardType: Joi.string().valid(...cardType).required(),
    cardNumber: Joi.string().creditCard().required(),
    printedName: Joi.string().required(),
    cvv: Joi.string().length(3).required(),
    password: Joi.string().regex(/^\d+$/).required(),
    expirationDate: Joi.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/).required(),
    isVirtual: Joi.boolean().required()

});

