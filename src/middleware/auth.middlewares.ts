import { sign, verify } from "jsonwebtoken";

export const createAccessToken = async (userId: any): Promise<string> => {
    let token = sign({ userId: userId }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "150d",
    });
    return token;
};