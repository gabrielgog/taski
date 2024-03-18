import '@testing-library/jest-dom';
import { TaskListItem } from '@/components/TaskList';
import { addTasks, getTasks } from '@/services/taskService';
import networkInstance from '@/services/axios';
describe('tasksApi', () => {
  const mockTask: TaskListItem = { id: 1, title: 'New Task', description: 'Some short description', completed: false };
  const errorMessage = 'Error fetching tasks';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches tasks successfully', async () => {
    const mockData = [{ id: 1, title: 'Task 1', description: 'Description for Task 1', completed: false }];
    jest.spyOn(networkInstance, 'get').mockResolvedValueOnce({ data: mockData });

    await expect(getTasks()).resolves.toEqual(mockData);
  });

  it('handles errors when fetching tasks', async () => {
    jest.spyOn(console, 'error').mockImplementationOnce(() => {});
    jest.spyOn(networkInstance, 'get').mockRejectedValueOnce(new Error(errorMessage));

    await expect(getTasks()).resolves.toEqual([]);
    expect(console.error).toHaveBeenCalledWith('Error fetching tasks:', new Error(errorMessage));
  });

  it('adds tasks successfully', async () => {
    const responseData = { id: 1, message: 'Task added successfully' };
    jest.spyOn(networkInstance, 'post').mockResolvedValueOnce({ data: responseData });

    await expect(addTasks(mockTask)).resolves.toEqual(responseData);
  });

  it('handles errors when adding tasks', async () => {
    jest.spyOn(console, 'error').mockImplementationOnce(() => {});
    jest.spyOn(networkInstance, 'post').mockRejectedValueOnce(new Error(errorMessage));

    await expect(addTasks(mockTask)).resolves.toEqual([]);
    expect(console.error).toHaveBeenCalledWith('Error adding tasks:', new Error(errorMessage));
  });
});
