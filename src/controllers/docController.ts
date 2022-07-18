import { Request, Response } from "express";

import docServices from "../services/docServices.js";
import { CreateDoc } from "../services/docServices.js";

export async function createDoc(req: Request, res: Response) {
    const { documentType, userName, dateEmission, dateExpiration, documentNumber, emiterInstitution } = req.body;
    const { userId } = res.locals.tokenData;
    const newDoc: CreateDoc = {
        documentType,
        userName,
        dateEmission,
        dateExpiration,
        documentNumber,
        emiterInstitution,
        userId
    };
    await docServices.insertDoc(newDoc);
    res.sendStatus(201);
}

export async function getUserDoc(req: Request, res: Response) {
    const { userId } = res.locals.tokenData;
    const docQuery = req.query.id as string;
    const docId = parseInt(docQuery);
    if (docQuery) {
        const doc = await docServices.getDoc(docId, userId);
        return res.status(200).send(doc);
    }
    const docs = await docServices.getDocs(userId);
    res.status(200).send(docs);
}

export async function deleteDoc(req: Request, res: Response) {
    const { userId } = res.locals.tokenData;
    const docParams = req.params.id as string;
    const docId = parseInt(docParams);
    await docServices.deleteDoc(docId, userId);
    res.sendStatus(200);
}