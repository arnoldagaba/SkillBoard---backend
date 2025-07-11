import prisma from "../../config/prisma.js";
import { createProjectInput } from "../validators/project.validator.js";

export const getAllProjects = async () => {
    return await prisma.project.findMany({
        include: { user: true },
    });
};

export const createProject = async (data: createProjectInput) => {
    return await prisma.project.create({
        data,
    });
};
