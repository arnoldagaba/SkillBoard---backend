import z from "zod";

export const createProjectSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z.string().min(5, "Description too short"),
    techStack: z.array(z.string()),
    userId: z.string(),
});
export type createProjectInput = z.infer<typeof createProjectSchema>;
