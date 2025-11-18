import express from "express";
import { addTask, getTask, updateTask } from "../../controllers/taskController/taskController";

const router = express.Router();

router.post("/", addTask);
router.get("/", getTask)
router.put("/:id", updateTask);

export default router;