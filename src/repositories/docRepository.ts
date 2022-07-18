import { prisma } from "../config/database.js";
import { CreateDoc } from "../services/docServices.js";
import { DOCUMENTTYPE } from "@prisma/client";

async function findById(docId: number) {
    return prisma.document.findUnique({
        where: { id: docId }
    });
}

async function findByUserId(userId: number) {
    return prisma.document.findMany({
        where: { userId }
    });
}

async function findByTypeUserId(documentType: DOCUMENTTYPE, userId: number) {
    return prisma.document.findFirst({
        where: { documentType, userId }
    })
}

async function insert(docData: CreateDoc) {
    await prisma.document.create({
        data: docData,
    });
}

async function deleteById(docId: number) {
    await prisma.document.delete({
        where: { id: docId }
    });
}

export default {
    findById,
    findByUserId,
    findByTypeUserId,
    insert,
    deleteById
}