import { addTasks } from "../../services/taskService/taskService";
import { addTask } from "./taskController";

jest.mock("../../services/addTask/addTask");

describe("addTask", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  test("should create a task and return 201", async () => {
    req.body = {
      name: "Read",
      description: "Read the book",
      status: "Pending",
      priority: "Low",
      deadline: "sep15",
    };
    (addTasks as any).mockResolvedValue(req.body);
    await addTask(req, res);
    expect(addTasks).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
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
    req.body = {
      name: "Read",
      description: "Read the book",
      status: "Pending",
      priority: "Low",
      deadline: "sep15",
    };
    (addTasks as any).mockRejectedValue(new Error("something went wrong"));
    await addTask(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to create tasks",
    });
  });
});
