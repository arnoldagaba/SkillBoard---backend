import { User } from "../generated/prisma/client.js";

export type UserWithoutPassword = Omit<User, "password">;
