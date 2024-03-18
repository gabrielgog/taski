import { TaskListItem } from "@/components/TaskList";
import networkInstance from "./axios";
import routes from "@/const/routes";

export const getTasks = async () => {
  try {
    const response = await networkInstance.get(routes.TODOS);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const addTasks = async (tasksData: TaskListItem) => {
    try {
      const response = await networkInstance.post(routes.TODOS, tasksData);
      return response.data;
    } catch (error) {
      console.error("Error adding tasks:", error);
      return [];
    }
  };
  
  