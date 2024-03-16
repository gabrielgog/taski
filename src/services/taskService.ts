import networkInstance from "./axios";
import routes from "@/const/routes";

export const getTasks = async () => {
  try {
    const response = await networkInstance.get(routes.TODOS);
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
};
