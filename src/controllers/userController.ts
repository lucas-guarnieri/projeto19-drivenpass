import { Request, Response } from "express";

import userServices from "../services/userServices.js";
import { CreateUserData } from "../services/userServices.js";

export async function createUser(req: Request, res: Response) {
    const userData: CreateUserData = req.body;
    await userServices.insertUser(userData);
    res.sendStatus(201);
}

