import { prisma } from "../config/database.js";
import { CreateNote } from "../services/secureNotesServices.js";

async function findById(noteId: number) {
    return prisma.secureNote.findUnique({
        where: { id: noteId }
    })
}

async function findByUserId(userId: number) {
    return prisma.secureNote.findMany({
        where: { userId }
    })
}

async function findByTitleUserId(title: string, userId: number) {
    return prisma.secureNote.findFirst({
        where: { title, userId }
    })
}

async function insert(noteData: CreateNote) {
    await prisma.secureNote.create({
        data: noteData,
    });
}

async function deleteById(noteId: number) {
    await prisma.secureNote.delete({
        where: { id: noteId }
    });
}

export default {
    insert,
    findById,
    findByUserId,
    findByTitleUserId,
    deleteById
}