import React from "react";

interface TaskDetailProps {
  description: string;
}

const TaskDetail = ({ description }: TaskDetailProps) => {
  return (
    <div className="">
      {description ? (
        <p className="text-sm text-gray-600">{description}</p>
      ) : (
        <p className="text-gray-600">No description was added</p>
      )}
    </div>
  );
};

export default TaskDetail;
