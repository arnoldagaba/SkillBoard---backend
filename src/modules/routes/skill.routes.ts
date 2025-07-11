import { Router } from "express";
import { requireAuth } from "../../middleware/authMiddleware.js";
import {
    createSkill,
    deleteSkill,
    getSkills,
} from "../controllers/skill.controller.js";

const router = Router();

router.get("/", requireAuth, getSkills);
router.post("/", requireAuth, createSkill);
router.delete("/:id", requireAuth, deleteSkill);

export default router;
