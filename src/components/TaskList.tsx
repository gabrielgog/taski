import React from 'react';


interface TaskListProps{
    title: string;
    description: string;
    completed: boolean;
    tasks: any;
}

const TaskList = ({title, description, completed, tasks}: TaskListProps) => {
  return (
    <div>
        {tasks.map((data: any) => {
        <div key={data.id}>
         <p>{data.title}</p>

        </div>
        
        })}
    </div>
  )
}

export default TaskList