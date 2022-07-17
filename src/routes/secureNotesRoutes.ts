import { Router } from "express";

import { createSecureNote, getUserNote, deleteNote } from "../controllers/secureNotesController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/authMiddleware.js";
import { credentialSchema } from "../schemas/secureNoteSchema.js";

const noteRouter = Router();

noteRouter.post("/secure-note", validateSchemaMiddleware(credentialSchema), validateToken, createSecureNote);
noteRouter.get("/secure-note", validateToken, getUserNote);
noteRouter.delete("/secure-note/:id", validateToken, deleteNote);

export default noteRouter;