import { Task } from "../../types/types";
import { addTasks, getTasks, updateTasks } from "./taskService";

jest.mock("../../firebase/firebaseConfig", () => {
  const mockSet = jest.fn().mockResolvedValue(null);
  const mockGet = jest.fn().mockResolvedValue({ exists: true });

  const mockDoc = {
    id: "123",
    set: mockSet,
    get: mockGet,
  };

  const mockCollection = {
    doc: jest.fn((id?: string) => {
      if (id) mockDoc.id = id; 
      else mockDoc.id = "123"; 
      return mockDoc;
    }),
    get: jest.fn().mockResolvedValue({
      docs: [
        {
          id: "123",
          data: () => ({
            name: "read",
            description: "reading the book",
            status: "Pending",
            priority: "Low",
            deadline: "sep15",
          }),
        },
      ],
    }),
  };

  return {
    db: {
      collection: jest.fn(() => mockCollection),
    },
  };
});

import { db } from "../../firebase/firebaseConfig";

describe("Task service", () => {
  const mockTask: Task = {
    name: "read",
    description: "reading the book",
    status: "Pending",
    priority: "Low",
    deadline: "sep15",  
  };

  let mockCollection: any;
  let mockDoc: any;
  let mockSet: any;
  let mockGet: any;

  beforeEach(() => {
    jest.clearAllMocks();

    mockCollection = (db.collection as jest.Mock)();
    mockDoc = mockCollection.doc();
    mockSet = mockDoc.set;
    mockGet = mockDoc.get;
  });

  test("addTasks should create task", async () => {
    const result = await addTasks(mockTask);
    expect(result.name).toBe("read");
    expect(result.description).toBe("reading the book");
  });

  test("getTasks should return all tasks", async () => {
    const tasks = await getTasks();
    expect(mockCollection.get).toHaveBeenCalled();
    expect(tasks.length).toBe(1);
    expect(tasks[0].name).toBe("read");
    expect(tasks[0].status).toBe("Pending");
    expect(tasks[0].id).toBe("123");
  });

  test("updateTasks should update an existing task", async () => {
    const updatedTask: Task = { ...mockTask, status: "Completed" };
    const result = await updateTasks("123", updatedTask);
    expect(mockCollection.doc).toHaveBeenCalledWith("123");
    expect(mockGet).toHaveBeenCalled();
    expect(mockSet).toHaveBeenCalledWith({ ...updatedTask, id: "123" });
    expect(result).toEqual({ ...updatedTask, id: "123" });
  });
});

