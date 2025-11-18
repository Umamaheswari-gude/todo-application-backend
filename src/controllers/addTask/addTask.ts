import { addTasks } from "../../services/addTask/addTask"
import { Request, Response } from "express";

export const addTask = async (req: Request, res: Response ) => {
    const { name, description, status, priority, deadline } = req.body;
     if (!name || !description || !status || !priority || !deadline ) {
    res.status(400).json({
      message: "All fields are required",
    });
}
    try {
        const task = await addTasks(req.body);
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: "Failed to create tasks"})
    }
};