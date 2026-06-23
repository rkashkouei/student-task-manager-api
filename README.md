# Student Task Manager API

A simple backend API built with Node.js and Express.

## Features

- Create a new task
- Get all tasks
- Get a single task by ID
- Update a task
- Delete a task
- Validate empty task titles
- Prevent duplicate task titles
- Automatically add creation timestamp to each task
- Track task update timestamps
- Task priorities (low, medium, high)
- Input validation

## Technologies

- Node.js
- Express.js

## How to run

```bash
npm install
node index.js
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | / | Test API |
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get a single task by ID |
| POST | /tasks | Create a new task |
| PUT | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |

## Example Task Response

## Example Task Response

```json
{
  "id": 1,
  "title": "Study Node.js",
  "completed": false,
  "createdAt": "2026-05-25T14:30:10.123Z",
  "updatedAt": null
}
```