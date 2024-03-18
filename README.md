# Taski

Taski is a task management tool that allows individuals to create and manage tasks.

## Project Overview

Taski is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It is deployed on [Netlify](https://www.netlify.com/).

### Installation

To run Taski locally, follow these steps:

1. Clone the repository to your local device.
2. Install all dependencies using your preferred package manager:
   ```bash
   npm install
   # or
   yarn
## Running the Development Server
npm run dev
# or
yarn dev

Open http://localhost:3000 in your web browser to view the application.

## Features

With Taski, users can:

1. Create tasks
2. View task details
3. View a list of completed tasks
4. Search for tasks

## Constraints and Future Improvements
 There are areas for improvement for taski in the future
1. Implement persistence for added tasks using local storage or state management tools like Redux.
2. Enable editing and deleting tasks for better task management.

## JSONPlaceholder API Integration

Taski utilizes the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API to fetch all tasks and to create new tasks.

### Fetching Tasks

Taski fetches all tasks from the JSONPlaceholder API. The tasks are displayed in the application for users to view and manage.

### Creating Tasks

Users can create new tasks in Taski, and the data is sent to the JSONPlaceholder API to simulate the creation of tasks. While the JSONPlaceholder API does not actually persist data, it provides a convenient way to demonstrate task creation functionality in Taski.


## Testing

Taski components are thoroughly tested using Jest. To run the tests in isolation, execute the following command in the project directory:
yarn test
# or
npm test


## Live URL
The live version of Taski can be accessed at https://taski-dev.netlify.app/.

## Resources

- [Next.js Documentation](https://nextjs.org/docs).
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
customization options.
- [React Hook Form Documentation](https://react-hook-form.com/get-started)
for form validation.
- [React Hot Toast Documentation](https://react-hot-toast.com/)
JSONPlaceholder API and its endpoints.
- [JSONPlaceholder API Documentation](https://jsonplaceholder.typicode.com/).
