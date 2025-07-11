import z from "zod";

export const createGoalSchema = z.object({
    title: z.string().min(3),
    progress: z.number().min(0).max(100),
});
export type CreateGoalInput = z.infer<typeof createGoalSchema>;

export const updateGoalSchema = z.object({
    progress: z.number().min(0).max(100),
});
export type UpdateGoalInput = z.infer<typeof updateGoalSchema>;
