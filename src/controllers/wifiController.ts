import { Request, Response } from "express";

import wifiServices from "../services/wifiServices.js";
import { CreateWifi } from "../services/wifiServices.js";

export async function createWifi(req: Request, res: Response) {
    const { title, wifiName, password } = req.body;
    const { userId } = res.locals.tokenData;
    const newWifi: CreateWifi = {
        title,
        wifiName,
        password,
        userId
    };
    await wifiServices.insertWifi(newWifi);
    res.sendStatus(201);
}

export async function getUserWifi(req: Request, res: Response) {
    const { userId } = res.locals.tokenData;
    const wifiQuery = req.query.id as string;
    const wifilId = parseInt(wifiQuery);
    if (wifiQuery) {
        const wifi = await wifiServices.getWifi(wifilId, userId);
        return res.status(200).send(wifi);
    }
    const wifis = await wifiServices.getWifis(userId);
    res.status(200).send(wifis);
}

export async function deleteWifi(req: Request, res: Response) {
    const { userId } = res.locals.tokenData;
    const wifiParam = req.params.id as string;
    const wifiId = parseInt(wifiParam);
    await wifiServices.deleteWifi(wifiId, userId);
    res.sendStatus(200);
}