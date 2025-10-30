//Load environment variables first
require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


//Middleware to pass JSON data
app.use(express.json());

//Basic route
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to Task Manager API",
        version: "1.0.0",
        endpoints: {
            tasks: "/api/tasks"
        }
    });
});

//Import routes
const taskRoutes = require('./task_routers/task_routes');
app.use('/api/tasks', taskRoutes);

//404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

//Start server
app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
    console.log(`📝 API available at http://localhost:${port}/api/tasks`);
});
