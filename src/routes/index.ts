import { Router } from "express";
import authRouter from "./authRoutes.js";
import credentialRouter from "./credentialRoutes.js";
import noteRouter from "./secureNotesRoutes.js";
import cardRouter from "./cardsRoutes.js";
import wifiRouter from "./wifiRoutes.js";


const router = Router();
router.use(authRouter);
router.use(credentialRouter);
router.use(noteRouter);
router.use(cardRouter);
router.use(wifiRouter);

export default router;