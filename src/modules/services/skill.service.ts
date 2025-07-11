import prisma from "../../config/prisma.js";

export const getSkillsByUser = async (userId: string) => {
    return prisma.skill.findMany({ where: { userId } });
};

export const createSkill = async (userId: string, name: string) => {
    return prisma.skill.create({
        data: { name, userId },
    });
};

export const deleteSkill = async (userId: string, skillId: string) => {
    return prisma.skill.deleteMany({
        where: { id: skillId, userId },
    });
};
