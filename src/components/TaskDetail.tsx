import React from "react";

interface TaskDetailProps {
  description: string;
}

const TaskDetail = ({ description }: TaskDetailProps) => {
  return (
    <div className="">
        <p className="text-sm text-gray-600">{description ? description : "No description was added"}</p>
    </div>
  );
};

export default TaskDetail;
