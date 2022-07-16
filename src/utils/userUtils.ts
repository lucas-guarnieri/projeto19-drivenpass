import userRepository from "../repositories/userRepository.js";

async function existingUserEmail(email: string) {
    const existingUser = await userRepository.findByEmail(email);
    if (!existingUser) throw { type: "not_found", message: "user do not exists" };
    return existingUser;
}

export default {
    existingUserEmail,
}