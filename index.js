const express = require('express');
const app = express();

const taskRoutes = require('./routes/taskRoutes');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Student Task Manager API is running');
});

app.use('/', taskRoutes);

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});