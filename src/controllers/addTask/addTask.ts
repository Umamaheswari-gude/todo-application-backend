import { addTasks } from "../../services/addTask/addTask"
import { Request, Response } from "express";

export const addTask = async (req: Request, res: Response ) => {
    try {
        const task = await addTasks(req.body);
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: "Failed to create tasks"})
    }
};