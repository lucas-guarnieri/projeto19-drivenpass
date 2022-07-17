import bcrypt from "bcrypt";
import Cryptr from "cryptr";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

async function passwordEncryption(password: string) {
    const encryptedPassword = bcrypt.hashSync(password, 10);
    return encryptedPassword;
}

async function validatePassword(password: string, encryptedPassword: string) {
    const validPassword = bcrypt.compareSync(password, encryptedPassword);
    if (!validPassword) throw { type: "unauthorized", message: "login authorization problem" };
}

function setToken(userId: number) {
    const tokenData = { userId };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET);
    return token;
}

function textEncryption(text: string) {
    const cryptrKey = process.env.CRYPTR_KEY;
    const cryptr = new Cryptr(cryptrKey);
    const encryptedText: string = cryptr.encrypt(text);
    return encryptedText;
}

function textDesencryption(encryptedText: string) {
    const cryptrKey = process.env.CRYPTR_KEY;
    const cryptr = new Cryptr(cryptrKey);
    const text: string = cryptr.decrypt(encryptedText);
    return text;
}

function checkObejtctAuthor(objId: number, userId: number) {
    if (objId !== userId) throw { type: "unauthorized", message: "credential does not belong to user" }
}

export default {
    passwordEncryption,
    validatePassword,
    setToken,
    textEncryption,
    textDesencryption,
    checkObejtctAuthor
}