import { Router } from "express";

import { createCredential } from "../controllers/credentialsController.js"
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/authMiddleware.js";

const credentialRouter = Router();

credentialRouter.post("/credential", validateToken, createCredential);


export default credentialRouter;
