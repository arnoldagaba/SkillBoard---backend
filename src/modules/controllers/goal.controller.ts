import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import * as goalService from "../services/goal.service.js";
import {
    createGoalSchema,
    updateGoalSchema,
} from "../validators/goal.validator.js";

export const getGoals = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const goals = await goalService.getGoalsByUser(req.user!.id);
            res.status(StatusCodes.OK).json(goals);
        } catch (error) {
            next(error);
        }
    }
);

export const createGoal = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = createGoalSchema.parse(req.body);
            const goal = await goalService.createGoal(
                req.user!.id,
                data.title,
                data.progress
            );
            res.status(StatusCodes.CREATED).json(goal);
        } catch (error) {
            next(error);
        }
    }
);

export const updateGoal = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = updateGoalSchema.parse(req.body);
            const goal = await goalService.updateGoalProgress(
                req.user!.id,
                req.params.id,
                data.progress
            );
            res.status(StatusCodes.OK).json({ message: "Goal updated" });
        } catch (error) {
            next(error);
        }
    }
);

export const deleteGoal = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const goal = await goalService.deleteGoal(
                req.user!.id,
                req.params.id
            );
            res.status(StatusCodes.OK).json({ message: "Goal deleted" });
        } catch (error) {
            next(error);
        }
    }
);
