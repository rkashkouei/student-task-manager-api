let tasks = [];
let id = 1;

exports.getTasks = (req, res) => {
    res.json(tasks);
};

exports.getTaskById = (req, res) => {
    const taskId = parseInt(req.params.id);

    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
};

exports.createTask = (req, res) => {
    const { title } = req.body;

    if (!title || title.trim() === '') {
        return res.status(400).json({ message: 'Title is required' });
    }

    const existingTask = tasks.find(
    t => t.title.toLowerCase() === title.toLowerCase()
);

if (existingTask) {
    return res.status(400).json({ message: 'Task already exists' });
}

    const newTask = {
        id: id++,
        title: title,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
};

exports.updateTask = (req, res) => {
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
};

exports.deleteTask = (req, res) => {
    const taskId = parseInt(req.params.id);

    const taskExists = tasks.find(t => t.id === taskId);

    if (!taskExists) {
        return res.status(404).json({ message: 'Task not found' });
    }

    tasks = tasks.filter(t => t.id !== taskId);

    res.json({ message: 'Task deleted successfully' });
};