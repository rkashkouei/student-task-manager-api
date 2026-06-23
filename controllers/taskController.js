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
    const { title, priority } = req.body;
    const validPriorities = ['low', 'medium', 'high'];
    if (priority !== undefined && !validPriorities.includes(priority)) {
        return res.status(400).json({ message: "Priority must be low, medium, or high" });
    }
    if (!title || title.trim() === '') {
        return res.status(400).json({ message: 'Title is required' });
    }

    const existingTask = tasks.find(
    t => t.title.toLowerCase() === title.toLowerCase()
);

if (existingTask) {
    return res.status(400).json({ message: 'Task already exists' });
}
    console.log(req.body);
    const newTask = {
        id: id++,
        title: title,
        priority: priority || "medium",
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: null
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
};

exports.updateTask = (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, completed, priority } = req.body;
    const validPriorities = ["low", "medium", "high"];

    if (
    priority !== undefined &&
    !validPriorities.includes(priority)
    ) {
    return res.status(400).json({
        message: "Priority must be low, medium, or high"
    });
    }

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

    if (priority !== undefined) {
    task.priority = priority;
    }
    task.updatedAt = new Date().toISOString();
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