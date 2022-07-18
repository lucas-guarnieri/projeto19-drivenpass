import { Wifi } from "@prisma/client";
import wifiRepository from "../repositories/wifiRepository.js";
import authUtils from "../utils/authUtils.js";

export type CreateWifi = Omit<Wifi, "id">

async function insertWifi(newWifi: CreateWifi) {
    const encryptedPassword = authUtils.textEncryption(newWifi.password);
    const securedWifi: CreateWifi = { ...newWifi, password: encryptedPassword };
    await wifiRepository.insert(securedWifi);
}

async function getWifi(wifiId: number, userId: number) {
    const wifi = await getWifiById(wifiId);
    authUtils.checkObejtctAuthor(wifi.userId, userId);
    const password = authUtils.textDesencryption(wifi.password);
    return { ...wifi, password };
}

async function getWifis(userId: number) {
    const wifis = await wifiRepository.findByUserId(userId);
    if (wifis.length > 0) {
        const bareWifi = [];
        wifis.forEach((wifi) => {
            const aux = { ...wifi, password: authUtils.textDesencryption(wifi.password) };
            bareWifi.push(aux);
        });
        return bareWifi;
    }
    return wifis;
}

async function deleteWifi(wifiId: number, userId: number) {
    const wifi = await getWifiById(wifiId);
    authUtils.checkObejtctAuthor(wifi.userId, userId);
    await wifiRepository.deleteById(wifi.id);
}

async function getWifiById(wifiId: number) {
    const wifi = await wifiRepository.findById(wifiId);
    if (!wifi) throw { type: "not_found", message: "wifi not found" };
    return wifi;
}

export default {
    insertWifi,
    getWifi,
    getWifis,
    deleteWifi
}