import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import * as projectService from "../services/project.service.js";

export const getProjects = asyncHandler(
    async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const projects = await projectService.getAllProjects();
            res.status(StatusCodes.OK).json(projects);
        } catch (err) {
            next(err);
        }
    }
);

export const createProject = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const project = await projectService.createProject(req.body);
            res.status(StatusCodes.CREATED).json(project);
        } catch (err) {
            next(err);
        }
    }
);
