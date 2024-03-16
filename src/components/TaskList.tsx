import React, { useState } from "react";

interface TaskListItem {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: TaskListItem[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  const toggleTaskCompletion = (taskId: number) => {
    setCompletedTasks((prevCompletedTasks) =>
      prevCompletedTasks.includes(taskId)
        ? prevCompletedTasks.filter((id) => id !== taskId)
        : [...prevCompletedTasks, taskId]
    );
  };

  return (
    <div className="flex flex-col gap-5 min-w-36">   
      {tasks?.map((task) => (
        <div key={task.id} className="p-6 bg-[#F5F7F9] rounded-lg flex flex-row items-center gap-3">
          <input
            checked={completedTasks.includes(task.id)}
            onChange={() => toggleTaskCompletion(task.id)}
            type="checkbox"
          />
          <p className={`${completedTasks.includes(task.id) ? "line-through text-gray-500" : "none"}`}>{task.title}</p>
          {/* <p>{task.description}</p> */}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
