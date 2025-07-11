import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import * as authService from "../services/authService.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";
import { createAccessToken, createRefreshToken } from "../../utils/token.js";

export const register = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = registerSchema.parse(req.body);
            const user = await authService.registerUser(data);
            if (!user) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: "User already exists",
                });
                return;
            }

            res.status(StatusCodes.CREATED).json(user);
        } catch (error) {
            next(error);
        }
    }
);

export const login = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = loginSchema.parse(req.body);
            const user = await authService.validateUser(data);
            if (!user) {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    message: "Invalid credentials",
                });
                return;
            }

            const accessToken = createAccessToken(user);
            const refrshToken = createRefreshToken(user);

            res.cookie("jid", refrshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            res.status(StatusCodes.OK).json({ accessToken });
        } catch (error) {
            next(error);
        }
    }
);

export const me = asyncHandler(async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json(req.user);
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
    res.clearCookie("jid");
    res.status(StatusCodes.OK).json({ message: "Logout successful" });
});
