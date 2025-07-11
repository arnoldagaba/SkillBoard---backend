import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "superscret";

export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
        return;
    }

    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET) as {
            sub: string;
            email: string;
        };
        req.user = { id: decoded.sub, email: decoded.email };
        next();
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Token invalid or expired",
        });
    }
};
