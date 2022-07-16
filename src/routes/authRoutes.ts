import { Router } from "express";
import { createUser } from "../controllers/userController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { signupSchema } from "../schemas/signupSchema.js";


const authRouter = Router();

authRouter.post("/sign-up", validateSchemaMiddleware(signupSchema), createUser);

export default authRouter;