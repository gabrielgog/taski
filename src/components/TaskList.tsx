import React, { useState } from "react";
import Image from "next/image";
import EmptyImage from "../../public/images/empty-image.svg";
import CollapseIcon from "../../public/icons/collapse-icon.svg";
import AddTaskIcon from "../../public/icons/addTask-icon.svg";
import { toSentenceCase } from "@/utils/toSetentenceCase";
import TaskDetail from "./TaskDetail";

export interface TaskListItem {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: TaskListItem[];
  openModal: () => void
}

const TaskList: React.FC<TaskListProps> = ({ tasks, openModal }) => {
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);

  const toggleTaskCompletion = (taskId: number) => {
    setCompletedTasks((prevCompletedTasks) =>
      prevCompletedTasks.includes(taskId)
        ? prevCompletedTasks.filter((id) => id !== taskId)
        : [...prevCompletedTasks, taskId]
    );
  };

  const toggleTaskDetail = (taskId: number) => {
    setExpandedTaskId((prevTaskId) => (prevTaskId === taskId ? null : taskId));
  };

  if (tasks.length === 0) {
    return (
      <div className="text-gray-500 flex flex-col gap-5 mt-8 text-center items-center">
        <Image src={EmptyImage} alt="empty-image" />
        <span>You have no tasks listed.</span>
        <button className="flex flex-row items-center p-4 gap-4 bg-[#007FFF1A] rounded-lg text-primary font-semibold" onClick={openModal}>
          <Image src={AddTaskIcon} alt="add-task-icon" />
          Create task
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 min-w-36">
        
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`p-6 bg-[#F5F7F9] rounded-lg flex flex-row items-center justify-between transition-all duration-500 max-h-[${expandedTaskId === task.id ? "100" : "40"}]`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <input
              checked={completedTasks.includes(task.id)}
              onChange={() => toggleTaskCompletion(task.id)}
              className="h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all checked:border-primary checked:bg-primary"
              type="checkbox"
            />
            <p className={`${completedTasks.includes(task.id) ? "line-through text-gray-500" : ""}`}>
              {toSentenceCase(task.title)}
            </p>
            {expandedTaskId === task.id && <div className="w-full transition-all duration-500">
                <TaskDetail  description={task.description}/>
                </div>}
          </div>
          <div className="cursor-pointer">
            <Image
              src={CollapseIcon}
              alt="collapse-icon"
              className={`cursor-pointer ${expandedTaskId === task.id ? "rotate-180 transform duration-700 backdrop-opacity-100" : ""}`}
              onClick={() => toggleTaskDetail(task.id)}
            />
          </div>
        </div>
        
      ))}
      
      
    </div>
  );
};

export default TaskList;
