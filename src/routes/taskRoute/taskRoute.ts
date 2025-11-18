import express from "express";
import { addTask } from "../../controllers/taskController/taskController";

const router = express.Router();

router.post("/", addTask);

export default router;