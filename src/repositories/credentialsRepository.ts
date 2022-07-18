import { prisma } from "../config/database.js";
import { CreateCredential } from "./../services/credentialServices.js"

async function findById(credentialId: number) {
    return prisma.credential.findUnique({
        where: { id: credentialId }
    });
}

async function findByUserId(userId: number) {
    return prisma.credential.findMany({
        where: { userId }
    });
}

async function findByTitleUserId(title: string, userId: number) {
    return prisma.credential.findFirst({
        where: { title, userId }
    });
}

async function insert(credentialData: CreateCredential) {
    await prisma.credential.create({
        data: credentialData,
    });
}

async function deleteById(credentialId: number) {
    await prisma.credential.delete({
        where: { id: credentialId }
    });
}

export default {
    insert,
    findById,
    findByUserId,
    findByTitleUserId,
    deleteById
}