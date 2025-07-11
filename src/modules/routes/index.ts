import { Router } from "express";
import authRoutes from "./auth.routes.js";
import projectRoutes from "./project.routes.js";

const router = Router();

router.use("/projects", projectRoutes);
router.use("/auth", authRoutes);

export default router;
