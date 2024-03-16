import axios from "axios";
import { BASE_URL } from "@/const/routes";

const networkInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

networkInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios request error:", error);
    return Promise.reject(error);
  },
);

export default networkInstance;
