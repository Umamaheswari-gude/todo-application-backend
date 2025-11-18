import { addTasks } from "../../services/addTask/addTask";
import { addTask } from "./addTask";

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
});
