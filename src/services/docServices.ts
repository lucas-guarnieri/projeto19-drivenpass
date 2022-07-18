import { Document } from "@prisma/client";
import docRepository from "../repositories/docRepository.js";
import authUtils from "../utils/authUtils.js";

export type CreateDoc = Omit<Document, "id">

async function insertDoc(newDoc: CreateDoc) {
    const existingDoc = await docRepository.findByTypeUserId(
        newDoc.documentType,
        newDoc.userId
    );
    if (existingDoc) throw { type: "conflict", message: `${newDoc.documentType} already registered for this user` };
    await docRepository.insert(newDoc);
}

async function getDoc(docId: number, userId: number) {
    const doc = await getDocById(docId);
    authUtils.checkObejtctAuthor(doc.userId, userId);
    return { doc };
}

async function getDocs(userId: number) {
    const docs = docRepository.findByUserId(userId);
    return docs;
}

async function deleteDoc(docId: number, userId: number) {
    const doc = await getDocById(docId);
    authUtils.checkObejtctAuthor(doc.userId, userId);
    await docRepository.deleteById(doc.id);
}

async function getDocById(docId: number) {
    const doc = await docRepository.findById(docId);
    if (!doc) throw { type: "not_found", message: "doc not found" };
    return doc;
}

export default {
    insertDoc,
    getDoc,
    getDocs,
    deleteDoc
}