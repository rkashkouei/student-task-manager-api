const express = require('express');
const app = express();

app.use(express.json());
let tasks = [];
let id = 1;

const port = 3000;

app.get('/', (req, res) => {
    res.send('Student Task Manager API is running');
});
app.post('/tasks', (req, res) => {
    const { title } = req.body;

    const newTask = {
        id: id++,
        title: title,
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, completed } = req.body;

    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    if (title !== undefined) {
        task.title = title;
    }
    if (completed !== undefined) {
        task.completed = completed;
    }
     res.json(task);
});

app.delete ('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    
    const taskExists = tasks.find(t => t.id === taskId);
    if (!taskExists) {
        return res.status(404).json({ message: 'Task not found' });
    }
    tasks = tasks.filter(t => t.id !== taskId);
    res.json({ message: 'Task deleted successfully' });
});

app.get ('/tasks', (req, res) => {
    res.json(tasks);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});