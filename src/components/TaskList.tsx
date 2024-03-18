import React, { useState } from "react";
import Image from "next/image";
import EmptyImage from "../../public/images/empty-image.svg";
import CollapseIcon from "../../public/icons/collapse-icon.svg";
import DropDownIcon from "../../public/icons/dropdown-icon.svg";
import CompletedIcon from "../../public/icons/completeTask-icon.svg";
import EditIcon from "../../public/icons/edit-icon.svg";
import DeletetIcon from "../../public/icons/delete-icon.svg";
import AddTaskIcon from "../../public/icons/addTask-icon.svg";
import TaskDetail from "./TaskDetail";
import { truncateString } from "@/utils/truncate";

export interface TaskListItem {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: TaskListItem[];
  openModal?: () => void;
  loading?: boolean;
  checked?:boolean;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, openModal, loading, checked }) => {
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);

  const toggleTaskCompletion = (taskId: number) => {
    setCompletedTasks((prevCompletedTasks) =>
      prevCompletedTasks.includes(taskId)
        ? prevCompletedTasks.filter((id) => id !== taskId)
        : [...prevCompletedTasks, taskId],
    );
  };

  const toggleTaskDetail = (taskId: number) => {
    setExpandedTaskId((prevTaskId) => (prevTaskId === taskId ? null : taskId));
  };

  if (!loading && tasks.length === 0 && !checked) {
    return (
      <div className="text-gray-500 flex flex-col gap-5 mt-8 text-center items-center">
        <Image src={EmptyImage} alt="empty-image" />
        <span>You have no tasks listed.</span>
        <button
          className="flex flex-row items-center p-4 gap-4 bg-[#007FFF1A] rounded-lg text-primary font-semibold"
          onClick={openModal}
        >
          <Image src={AddTaskIcon} alt="add-task-icon" />
          Create task
        </button>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-5 min-w-36">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`p-6 ${task.completed ? "bg-[#F5F7F9]" : "bg-[#F5F7F9]"} rounded-lg flex flex-row items-center justify-between transition-all duration-500 max-h-[${expandedTaskId === task.id ? "100" : "40"}]`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
              disabled={task.completed}
                checked={
                  task?.completed ? true : completedTasks.includes(task.id)
                }
                onChange={() => toggleTaskCompletion(task.id)}
                className={`h-5 w-5 cursor-pointer appearance-none rounded-md border transition-all
                ${task.completed ? "checked:border-slate-500 checked:bg-slate-500" : "checked:border-primary checked:bg-primary"}
                 `}
                type="checkbox"
              />
              {(completedTasks.includes(task.id) || task.completed) && (
                <div className="pointer-events-none absolute bottom-2 left-0 right-0 flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-3.5 w-3.5 text-white ${task.completed ? "text-gray-300" : "text-white"}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>

            <p
              className={`pb-1 ${completedTasks.includes(task.id) ? "line-through text-gray-500" : task.completed ? "text-[#8D9CB8]" : ""}`}
            >
              {truncateString(task.title, 20)}
            </p>
            {expandedTaskId === task.id && (
              <div className="w-full transition-all duration-500">
                <TaskDetail description={task.description} />
              </div>
            )}
          </div>
          <div
            className={`${task.completed ? "hidden" : "block cursor-pointer"}`}
          >
            <div
              className={`flex gap-3 left-10 ${expandedTaskId === task.id ? "hidden" : ""}`}
            >
              <Image
                src={DropDownIcon}
                alt="drop-down-icon"
                className={``}
                onClick={() => toggleTaskDetail(task.id)}
              />
              <Image src={DeletetIcon} alt="delete-icon" />
              <Image src={EditIcon} alt="edit-icon" />
            </div>
            {expandedTaskId === task.id ? (
              <Image
                src={CollapseIcon}
                alt="collapse-icon"
                className={`cursor-pointer block rotate-180 transform duration-700 backdrop-opacity-100`}
                onClick={() => toggleTaskDetail(task.id)}
              />
            ) : (
              <Image
                src={CollapseIcon}
                alt="collapse-icon"
                className={`cursor-pointer hidden`}
                onClick={() => toggleTaskDetail(task.id)}
              />
            )}
          </div>
          {task.completed && (
            <Image
              src={CompletedIcon}
              alt="collapse-icon"
              className={`cursor-pointer block`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
