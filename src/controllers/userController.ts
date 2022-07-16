import { Request, Response } from "express";
import bcrypt from "bcrypt";

import userServices from "../services/userServices.js";
import { CreateUserData } from "../services/userServices.js";

export async function createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);

    const userData: CreateUserData = {
        name,
        email,
        password: passwordHash
    }
    await userServices.insertUser(userData);
    res.sendStatus(201);
}

