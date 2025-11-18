import { addTasks } from "./addTask";

jest.mock("../../firebase/firebaseConfig", () => {
  return {
    db: {
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          id: "123456",
          set: jest.fn().mockResolvedValue(null),
        })),
      })),
    },
  };
});

describe("addTasks service", () => {
  test("addTasks should create task", async () => {
    const task = {
      name: "read",
      description: "reading the book",
      status: "Pending",
      priority: "Low",
      deadline: "sep15",
    };
    const result = await addTasks(task);
    expect(result.name).toBe("read");
    expect(result.description).toBe("reading the book");
  });
});
