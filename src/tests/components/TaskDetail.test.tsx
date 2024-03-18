import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskDetail from '@/components/TaskDetail';

describe('TaskDetail component', () => {
  test('renders description correctly', () => {
    const description = 'This is a task description';
    const { getByText } = render(<TaskDetail description={description} />);
    const descriptionElement = getByText(description);
    expect(descriptionElement).toBeInTheDocument();
  });

  test('renders default message when no description is provided', () => {
    const { getByText } = render(<TaskDetail description="" />);
    const defaultDescriptionElement = getByText('No description was added');
    expect(defaultDescriptionElement).toBeInTheDocument();
  });
});
