import { addTasks, getTasks } from "./taskService";

jest.mock("../../firebase/firebaseConfig", () => {
  return {
    db: {
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          id: "123456",
          set: jest.fn().mockResolvedValue(null),
        })),
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

  test("getTasks should return all tasks", async () => {
    const tasks = await getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].name).toBe("read");
    expect(tasks[0].status).toBe("Pending");
    expect(tasks[0].id).toBe("123");
  });
});
