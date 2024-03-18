import React from 'react';
import { render } from '@testing-library/react';
import TaskList, { TaskListItem } from '@/components/TaskList';

describe('TaskList component', () => {
  test('renders task list', () => {
    const tasks: TaskListItem[] = [
      {
        id: 1,
        title: 'Task 1',
        description: 'Description for Task 1',
        completed: false,
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Description for Task 2',
        completed: true,
      },
    ];
    const openModal = jest.fn();
    render(<TaskList tasks={tasks} openModal={openModal} />);
  });
});
