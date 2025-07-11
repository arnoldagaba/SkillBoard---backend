import z from "zod";

export const createSkillSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
});
export type CreateSkillInput = z.infer<typeof createSkillSchema>;
