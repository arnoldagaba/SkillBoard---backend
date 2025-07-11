import { NextFunction, Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

export const errorHandler = (
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    console.error(err);
    if (err instanceof ZodError) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Validation failed",
            errors: err.issues,
        });
        return;
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
    });
};
