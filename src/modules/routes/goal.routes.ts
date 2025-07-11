import { Router } from "express";
import { requireAuth } from "../../middleware/authMiddleware.js";
import {
    createGoal,
    deleteGoal,
    getGoals,
    updateGoal,
} from "../controllers/goal.controller.js";

const router = Router();

router.get("/", requireAuth, getGoals);
router.post("/", requireAuth, createGoal);
router.patch("/:id", requireAuth, updateGoal);
router.delete("/:id", requireAuth, deleteGoal);

export default router;
