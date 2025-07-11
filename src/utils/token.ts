import jwt from "jsonwebtoken";
import { UserWithoutPassword } from "../types/auth.types.js";


const JWT_SECRET = process.env.JWT_SECRET ?? "superscret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "15m";
const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN ?? "7d";

export const createAccessToken = (user: UserWithoutPassword) => {
    return jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    });
};

export const createRefreshToken = (user: UserWithoutPassword) => {
    return jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: REFRESH_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    });
};
