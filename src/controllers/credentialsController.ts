import { Request, Response } from "express";

import credentialServices from "../services/credentialServices.js";
import authUtils from "../utils/authUtils.js";
import { CreateCredential } from "../services/credentialServices.js";

export async function createCredential(req: Request, res: Response) {
    const { title, url, userName, userPassword } = req.body;
    const { userId } = res.locals.tokenData;
    const encryptedUserPassword = authUtils.textEncryption(userPassword);
    const newCredential: CreateCredential = {
        title,
        url,
        userName,
        userPassword: encryptedUserPassword,
        userId
    }
    await credentialServices.insertCredential(newCredential);
    res.sendStatus(201);
}

export async function getUserCredential(req: Request, res: Response) {
    const { userId } = res.locals.tokenData;
    const credentialQuery = req.query.id as string;
    const credentialId = parseInt(credentialQuery);
    if (credentialQuery) {
        const credential = await credentialServices.getCredential(credentialId, userId);
        res.status(200).send(credential);
    }

    const credentials = await credentialServices.getCredentials(userId);
    res.status(200).send(credentials);
}

export async function deleteCredential(req: Request, res: Response) {
    const { userId } = res.locals.tokenData;
    const credentialParam = req.params.id as string;
    const credentialId = parseInt(credentialParam);
    await credentialServices.deleteCredential(credentialId, userId);
    res.sendStatus(200);
}
