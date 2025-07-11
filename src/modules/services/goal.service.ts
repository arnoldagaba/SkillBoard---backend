import prisma from "../../config/prisma.js";

export const getGoalsByUser = async (userId: string) => {
    return prisma.goal.findMany({ where: { userId } });
};

export const createGoal = async (
    userId: string,
    title: string,
    progress: number
) => {
    return prisma.goal.create({
        data: { title, progress, userId },
    });
};

export const updateGoalProgress = async (
    userId: string,
    goalId: string,
    progress: number
) => {
    return prisma.goal.updateMany({
        where: { id: goalId, userId },
        data: { progress },
    });
};

export const deleteGoal = async (userId: string, goalId: string) => {
    return prisma.goal.deleteMany({
        where: { id: goalId, userId },
    });
};
