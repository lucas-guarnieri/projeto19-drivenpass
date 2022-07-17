import { Router } from "express";
import authRouter from "./authRoutes.js";
import credentialRouter from "./credentialRoutes.js";
import noteRouter from "./secureNotesRoutes.js";


const router = Router();
router.use(authRouter);
router.use(credentialRouter);
router.use(noteRouter)

export default router;