import { Router } from "express";

import { createWifi, getUserWifi, deleteWifi } from "../controllers/wifiController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/authMiddleware.js";
import { wifiSchema } from "../schemas/wifiSchema.js";

const wifiRouter = Router();

wifiRouter.post("/wifi", validateSchemaMiddleware(wifiSchema), validateToken, createWifi);
wifiRouter.get("/wifi", validateToken, getUserWifi);//query ?id=wiflId for single wifi)
wifiRouter.delete("/wifi/:id", validateToken, deleteWifi);

export default wifiRouter;