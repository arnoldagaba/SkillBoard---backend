import { Router } from "express";
import authRoutes from "./auth.routes.js";
import projectRoutes from "./project.routes.js";
import skillRoutes from "./skill.routes.js";
import goalRoutes from "./goal.routes.js";

const router = Router();

router.use("/projects", projectRoutes);
router.use("/auth", authRoutes);
router.use("/skills", skillRoutes);
router.use("/goals", goalRoutes);

export default router;
