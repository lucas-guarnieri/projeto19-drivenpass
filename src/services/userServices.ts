import bcrypty from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { User } from "@prisma/client";
import userRepository from "./../repositories/userRepository.js"

export type CreateUserData = Omit<User, "id">

async function insertUser(newUserData: CreateUserData) {
    const existingUser = await userRepository.findByEmail(newUserData.email);
    if (existingUser) throw { type: "conflict", message: "user already exists" };
    await userRepository.insert(newUserData);
}


export default {
    insertUser,
}
