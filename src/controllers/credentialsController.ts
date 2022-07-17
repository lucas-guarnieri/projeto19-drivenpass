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
