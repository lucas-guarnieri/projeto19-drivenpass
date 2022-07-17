import { Router } from "express";

import { createCredential, getUserCredential, deleteCredential } from "../controllers/credentialsController.js"
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/authMiddleware.js";
import { credentialSchema } from "../schemas/credentialSchema.js";

const credentialRouter = Router();

credentialRouter.post("/credential", validateSchemaMiddleware(credentialSchema), validateToken, createCredential);
credentialRouter.get("/credential", validateToken, getUserCredential);//query ?id=credentialId for single credential
credentialRouter.delete("/credential/:id", validateToken, deleteCredential);

export default credentialRouter;
