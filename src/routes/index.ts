import { Router } from "express";
import authRouter from "./authRoutes.js";
import credentialRouter from "./credentialRoutes.js";


const router = Router();
router.use(authRouter);
router.use(credentialRouter);

export default router;