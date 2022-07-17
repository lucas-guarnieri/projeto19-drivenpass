import { Credential } from "@prisma/client";
import credentialsRepository from "../repositories/credentialsRepository.js";
import authUtils from "../utils/authUtils.js";

export type CreateCredential = Omit<Credential, "id">

async function insertCredential(newCredential: CreateCredential) {
    const existingCredential = await credentialsRepository.findByTitleUserId(
        newCredential.title,
        newCredential.userId
    );
    if (existingCredential) throw { type: "conflict", message: "credential title already in use" };
    await credentialsRepository.insert(newCredential);
}

async function getCredential(credentialId: number, userId: number) {
    const credential = await getCredentialById(credentialId);
    authUtils.checkObejtctAuthor(credential.userId, userId);
    const desencryptedPassword = authUtils.textDesencryption(credential.userPassword);
    return { ...credential, userPassword: desencryptedPassword };
}

async function getCredentials(userId: number) {
    const credentials = await credentialsRepository.findByUserId(userId);
    if (credentials.length > 0) {
        const desencryptedCredentials = [];
        credentials.forEach((credential) => {
            const aux = { ...credential, userPassword: authUtils.textDesencryption(credential.userPassword) };
            desencryptedCredentials.push(aux);
        })
        return desencryptedCredentials;
    }
    return credentials;
}

async function deleteCredential(credentialId: number, userId: number) {
    const credential = await getCredentialById(credentialId);
    authUtils.checkObejtctAuthor(credential.userId, userId);
    await credentialsRepository.deleteById(credential.id);
}

async function getCredentialById(credentialId: number) {
    const credential = await credentialsRepository.findById(credentialId);
    if (!credential) throw { type: "not_found", message: "credential not found" };
    return credential;
}

export default {
    insertCredential,
    getCredential,
    getCredentials,
    deleteCredential
}
