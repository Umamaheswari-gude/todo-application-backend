import {
  addTasks,
  deleteTasks,
  getTasks,
  updateTasks,
} from "../../services/taskService/taskService";
import { addTask, deleteTask, getTask, updateTask } from "./taskController";

jest.mock("../../services/taskService/taskService");

describe("addTask", () => {
  let req: any;
  let res: any;

  const mockTask = {
    id: "1",
    name: "Read",
    description: "Read the book",
    status: "Pending",
    priority: "Low",
    deadline: "2025-11-20",
  };

  beforeEach(() => {
    req = { params: { id: "1" }, body: {} };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  test("should create a task and return 201", async () => {
    req.body = mockTask;
    (addTasks as jest.Mock).mockResolvedValue(mockTask);
    await addTask(req, res);
    expect(addTasks).toHaveBeenCalledWith(mockTask);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockTask);
  });

  test("should return 400 if some fields are missing", async () => {
    req.body = { name: "Read" };
    await addTask(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "All fields are required",
    });
  });

  test("should return 500 if service throws error", async () => {
    req.body = mockTask;
    (addTasks as jest.Mock).mockRejectedValue(
      new Error("something went wrong")
    );
    await addTask(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to create tasks",
    });
  });

  test("should return all tasks and 200", async () => {
    (getTasks as jest.Mock).mockResolvedValue([mockTask]);
    await getTask(req, res);
    expect(getTasks).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([mockTask]);
  });

  test("should return 500 if service throws error", async () => {
    (getTasks as jest.Mock).mockRejectedValue(new Error("fails"));
    await getTask(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch tasks",
    });
  });

  test("should update a task and return 200", async () => {
    req.body = mockTask;
    (updateTasks as jest.Mock).mockResolvedValue(mockTask);
    await updateTask(req, res);
    expect(updateTasks).toHaveBeenCalledWith("1", mockTask);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTask);
  });

  test("should return 400 if fields are missing", async () => {
    req.body = { name: "Read" };
    await updateTask(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "All fields are required",
    });
  });

  test("should return 500 if update service throws error", async () => {
    req.body = mockTask;
    (updateTasks as jest.Mock).mockRejectedValue(new Error("update failed"));
    await updateTask(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Internal server error",
    });
  });

  test("should delete a task and return 200", async () => {
    (deleteTasks as jest.Mock).mockResolvedValue(undefined);
    await deleteTask(req, res);
    expect(deleteTasks).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Task deleted successfully",
    });  
  });

  test("should return 400 if id is missing", async () => {
    req.params = {};
    await deleteTask(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Task ID not found",
    });
  });
});