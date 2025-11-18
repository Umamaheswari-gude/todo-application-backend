import { addTasks, getTasks } from "../../services/taskService/taskService"
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

export const getTask = async (_req: Request, res: Response): Promise<void> => {
    try {
    const tasks = await getTasks();
    res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
  };