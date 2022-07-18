import { Router } from "express";

import { createDoc, getUserDoc, deleteDoc } from "../controllers/docController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/authMiddleware.js";
import { docSchema } from "../schemas/documentSchema.js";

const docRouter = Router();

docRouter.post("/document", validateSchemaMiddleware(docSchema), validateToken, createDoc);
docRouter.get("/document", validateToken, getUserDoc);
docRouter.delete("/document/:id", validateToken, deleteDoc);

export default docRouter;