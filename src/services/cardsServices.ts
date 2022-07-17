import { Card } from "@prisma/client";
import cardsRepository from "../repositories/cardsRepository.js";
import authUtils from "../utils/authUtils.js";

export type CreateCard = Omit<Card, "id">

async function insesrtCard(newCard: CreateCard) {
    const existingCard = await cardsRepository.findByTitleUserId(
        newCard.title,
        newCard.userId
    );
    if (existingCard) throw { type: "conflict", message: "card title already in use" };
    const encryptedPassword = authUtils.textEncryption(newCard.password);
    const encryptedCvv = authUtils.textEncryption(newCard.cvv);
    const securedCard: CreateCard = { ...newCard, password: encryptedPassword, cvv: encryptedCvv }
    await cardsRepository.insert(securedCard);
}

async function getCard(cardId: number, userId: number) {
    const card = await getCardById(cardId);
    authUtils.checkObejtctAuthor(card.userId, userId);
    const desencryptedPassword = authUtils.textDesencryption(card.password);
    const desencryptedCvv = authUtils.textDesencryption(card.cvv);
    return { ...card, password: desencryptedPassword, cvv: desencryptedCvv };
}

async function getCards(userId: number) {
    const cards = await cardsRepository.findByUserId(userId);
    if (cards.length > 0) {
        const desencryptedCards = [];
        cards.forEach((card) => {
            const aux = {
                ...card,
                password: authUtils.textDesencryption(card.password),
                cvv: authUtils.textDesencryption(card.cvv)
            };
            desencryptedCards.push(aux);
        });
        return desencryptedCards;
    }
    return cards;
}

async function deleteCard(cardId: number, userId: number) {
    const card = await getCardById(cardId);
    authUtils.checkObejtctAuthor(card.userId, userId);
    await cardsRepository.deleteById(card.id);
}

async function getCardById(cardId: number) {
    const card = await cardsRepository.findById(cardId);
    if (!card) throw { type: "not_found", message: "card not found" };
    return card;
}

export default {
    insesrtCard,
    getCard,
    getCards,
    deleteCard
}