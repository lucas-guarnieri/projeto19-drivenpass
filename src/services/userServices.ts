import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { User } from "@prisma/client";
import userRepository from "../repositories/userRepository.js"
import userUtils from "../utils/userUtils.js";
import authUtils from "../utils/authUtils.js";

export type CreateUserData = Omit<User, "id">
export type LoginData = Omit<User, "id" | "name">

async function insertUser(newUserData: CreateUserData) {
    const existingUser = await userRepository.findByEmail(newUserData.email);
    if (existingUser) throw { type: "conflict", message: "user already exists" };
    await userRepository.insert(newUserData);
}

async function userLogin(loginData: LoginData) {
    const user = await userUtils.existingUserEmail(loginData.email);
    await authUtils.validatePassword(loginData.password, user.password);
    const token = authUtils.setToken(user.id);
    return token;

}

export default {
    insertUser,
    userLogin
}
