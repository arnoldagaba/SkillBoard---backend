import bcrypt from "bcryptjs";
import { LoginInput, RegisterInput } from "../validators/auth.validator.js";
import prisma from "../../config/prisma.js";

export const registerUser = async (data: RegisterInput) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = prisma.user.create({
        data: {
            ...data,
            password: hashedPassword,
        },
    });

    const { password, ...userWithoutPassword } = await user;
    return userWithoutPassword;
};

export const validateUser = async (data: LoginInput) => {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) return null;

    const valid = await bcrypt.compare(data.password, user.password);
    const { password, ...userWithoutPassword } = user;
    return valid ? userWithoutPassword : null;
};
