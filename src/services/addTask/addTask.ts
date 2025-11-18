import { db } from "../../firebase/firebaseConfig";
import { Task } from "../../types/types";

const taskCollection = db.collection("todo-application");

export const addTasks = async (task: Task): Promise<Task> => {
  const addTask = taskCollection.doc();
  await addTask.set({ ...task, id: addTask.id });
  return { ...task ,id: addTask.id }
};