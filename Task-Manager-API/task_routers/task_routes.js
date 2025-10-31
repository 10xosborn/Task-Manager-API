const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task_controllers');

// Define routes
// Bonus: Filter tasks by status - register before '/:id' to avoid route shadowing
router.get('/', taskController.getAllTasks);
router.get('/status/:status', taskController.getTasksByStatus);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.patch('/:id/toggle', taskController.toggleTaskStatus);

// ✨ NEW BULK OPERATIONS
// IMPORTANT: These must come AFTER the specific routes above to avoid conflicts

// Bulk toggle status of all tasks
router.patch('/bulk/toggle-all', taskController.bulkToggleAll);
router.patch('/bulk/toggle-status/:status', taskController.bulkToggleByStatus);

// Bulk delete tasks by status
router.delete('/bulk/delete-all', taskController.bulkDeleteAll);
router.delete('/bulk/delete-status/:status', taskController.bulkDeleteByStatus);

module.exports = router;