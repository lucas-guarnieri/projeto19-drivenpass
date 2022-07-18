import Joi from "joi";

import { DOCUMENTTYPE } from "@prisma/client";
const docType = [DOCUMENTTYPE.rg, DOCUMENTTYPE.cnh];

export const docSchema = Joi.object({
    documentType: Joi.string().valid(...docType).required(),
    userName: Joi.string().required(),
    dateEmission: Joi.string().regex(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/).required(),
    dateExpiration: Joi.string().regex(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/).required(),
    documentNumber: Joi.string().regex(/^\d+$/).required(),
    emiterInstitution: Joi.string().required(),
});
