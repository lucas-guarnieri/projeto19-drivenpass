import { Credential } from "@prisma/client";
import credentialsRepository from "../repositories/credentialsRepository.js";

export type CreateCredential = Omit<Credential, "id">

async function insertCredential(newCredential: CreateCredential) {
    const existingCredential = await credentialsRepository.findByTitleUserId(
        newCredential.title,
        newCredential.userId
    );
    if (existingCredential) throw { type: "conflict", message: "credential title already in use" };
    await credentialsRepository.insert(newCredential);
}


export default {
    insertCredential,
}
