import { db } from "../../firebase/firebaseConfig";
import { Task } from "../../types/types";

const taskCollection = db.collection("todo-application");

export const addTasks = async (task: Task): Promise<Task> => {
  const addTask = taskCollection.doc();
  await addTask.set({ ...task, id: addTask.id });
  return { ...task ,id: addTask.id }
};

export const getTasks = async (): Promise<Task[]> => {
  const taskData = await taskCollection.get();
  return taskData.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  } as Task));
};