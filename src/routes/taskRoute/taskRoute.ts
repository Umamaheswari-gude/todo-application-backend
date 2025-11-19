import express from "express";
import { addTask, deleteTask, getTask, updateTask } from "../../controllers/taskController/taskController";

const router = express.Router();

router.post("/", addTask);
router.get("/", getTask)
router.put("/:id", updateTask);
router.delete("/:id", deleteTask)

export default router;