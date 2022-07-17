import { prisma } from "../config/database.js";
import { CreateCard } from "../services/cardsServices.js";

async function findById(cardId: number) {
    return prisma.card.findUnique({
        where: { id: cardId }
    });
}

async function findByUserId(userId: number) {
    return prisma.card.findMany({
        where: { userId }
    });
}

async function findByTitleUserId(title: string, userId: number) {
    return prisma.card.findFirst({
        where: { title, userId }
    })
}

async function insert(cardData: CreateCard) {
    await prisma.card.create({
        data: cardData,
    });
}

async function deleteById(cardId: number) {
    await prisma.card.delete({
        where: { id: cardId }
    });
}

export default {
    insert,
    findById,
    findByUserId,
    findByTitleUserId,
    deleteById
}