import { Router } from "express";

import { createCard, getUserCard, deleteCard } from "../controllers/cardsController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/authMiddleware.js";
import { cardSchema } from "../schemas/cardSchema.js";

const cardRouter = Router();

cardRouter.post("/card", validateSchemaMiddleware(cardSchema), validateToken, createCard);
cardRouter.get("/card", validateToken, getUserCard); //query ?id=cardId for single card
cardRouter.delete("/card/:id", validateToken, deleteCard);

export default cardRouter;