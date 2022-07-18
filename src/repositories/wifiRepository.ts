import { prisma } from "../config/database.js";
import { CreateWifi } from "../services/wifiServices.js";

async function findById(wifiId: number) {
    return prisma.wifi.findUnique({
        where: { id: wifiId }
    });
}

async function findByUserId(userId: number) {
    return prisma.wifi.findMany({
        where: { userId }
    });
}

async function findByTitleUserId(title: string, userId: number) {
    return prisma.wifi.findFirst({
        where: { title, userId }
    });
}

async function insert(wifiData: CreateWifi) {
    await prisma.wifi.create({
        data: wifiData
    });
}

async function deleteById(wifiId: number) {
    await prisma.wifi.delete({
        where: { id: wifiId }
    });
}

export default {
    findById,
    findByUserId,
    findByTitleUserId,
    insert,
    deleteById
}