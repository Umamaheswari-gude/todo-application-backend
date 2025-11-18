import express from "express";
import { addTask } from "../../controllers/addTask/addTask";

const router = express.Router();

router.post("/", addTask);

export default router;