import express from "express";
import { addTask, getTask } from "../../controllers/taskController/taskController";

const router = express.Router();

router.post("/", addTask);
router.get("/", getTask)

export default router;