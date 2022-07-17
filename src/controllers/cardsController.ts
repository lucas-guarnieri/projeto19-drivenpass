import { Request, Response } from "express";

import cardsServices from "../services/cardsServices.js";
import { CreateCard } from "../services/cardsServices.js";

export async function createCard(req: Request, res: Response) {
    const { title, cardType, cardNumber, printedName, cvv, password, expirationDate, isVirtual } = req.body;
    const { userId } = res.locals.tokenData;
    const newCard: CreateCard = {
        title,
        cardType,
        cardNumber,
        printedName,
        cvv,
        password,
        expirationDate,
        isVirtual,
        userId
    };
    await cardsServices.insesrtCard(newCard);
    res.sendStatus(201);
}

export async function getUserCard(req: Request, res: Response) {
    const { userId } = res.locals.tokenData;
    const cardQuery = req.query.id as string;
    const cardId = parseInt(cardQuery);
    if (cardQuery) {
        const card = await cardsServices.getCard(cardId, userId);
        return res.status(200).send(card);
    }
    const cards = await cardsServices.getCards(userId);
    res.status(200).send(cards);
}

export async function deleteCard(req: Request, res: Response) {
    const { userId } = res.locals.tokenData;
    const cardParam = req.params.id as string;
    const cardId = parseInt(cardParam);
    await cardsServices.deleteCard(cardId, userId);
    res.sendStatus(200);

}