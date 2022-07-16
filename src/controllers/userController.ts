import { Request, Response } from "express";

import userServices from "../services/userServices.js";
import authUtils from "../utils/authUtils.js";
import { CreateUserData, LoginData } from "../services/userServices.js";


export async function createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const passwordHash = await authUtils.passwordEncryption(password);
    const userData: CreateUserData = {
        name,
        email,
        password: passwordHash
    }
    await userServices.insertUser(userData);
    res.sendStatus(201);
}

export async function login(req: Request, res: Response) {
    const loginData: LoginData = req.body;
    const token = await userServices.userLogin(loginData);
    res.status(200).send(token);
}



