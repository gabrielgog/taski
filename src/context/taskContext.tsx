"use client"
import { TaskListItem } from "@/components/TaskList";
import React, { createContext, useContext, useState } from "react";

interface TaskContextType {
  tasks: TaskListItem[];
  addTask: (newTask: TaskListItem) => void;
}

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  addTask: () => {},
});

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider: React.FC<{ children: any}> = ({ children }) => {
  const [tasks, setTasks] = useState<TaskListItem[]>([]);

  const addTask = (newTask: TaskListItem) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};
