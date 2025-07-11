import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import * as skillService from "../services/skill.service.js";
import { createSkillSchema } from "../validators/skill.validator.js";

export const getSkills = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const skills = await skillService.getSkillsByUser(req.user!.id);
            res.status(StatusCodes.OK).json(skills);
        } catch (error) {
            next(error);
        }
    }
);

export const createSkill = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = createSkillSchema.parse(req.body);
            const skill = await skillService.createSkill(
                req.user!.id,
                data.name
            );

            res.status(StatusCodes.CREATED).json(skill);
        } catch (error) {
            next(error);
        }
    }
);

export const deleteSkill = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await skillService.deleteSkill(req.user!.id, req.params.id);
            res.status(StatusCodes.NO_CONTENT).json({
                message: "Skill deleted",
            });
        } catch (error) {
            next(error);
        }
    }
);
