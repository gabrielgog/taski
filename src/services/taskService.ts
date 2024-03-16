import networkInstance from "./axios";
import routes from "@/const/routes";

export const getTasks = async () => {
    try {
      const response = networkInstance.get(routes.TODOS);
      console.log(response, '--');
      
    //   if (!response.ok) {
    //     throw new Error('Failed to fetch todos');
    //   }
    //   return await response.json();
    } catch (error) {
      console.error('Error fetching todos:', error);
      return [];
    }
  };