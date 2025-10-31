const { tasks, nextId } = require('../data/tasks_db'); // Imports tasks array and nextId from the data store
let currentId = nextId; // Initializes a currentId counter for new tasks

//Capitalize first letter of a string
function capitalizeFirstLetter(str) {
  return str[0].toUpperCase() + str.slice(1);
}


// GET all tasks
exports.getAllTasks = (req, res) => {
  res.json({
    success: true,
    count: tasks.length,
    data: tasks
  });
};

// GET single task by ID
exports.getTaskById = (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  
  if (!task) {
    return res.status(404).json({
      success: false,
      message: `Task with ID ${req.params.id} not found`
    });
  }
  
  res.json({
    success: true,
    data: task
  });
};

// GET tasks by status (bonus feature)
exports.getTasksByStatus = (req, res) => {
  const { status } = req.params; // Destructure status from params

  // Normalize and validate status (case-insensitive)
  if (typeof status !== 'string') {
    return res.status(400).json({ success: false, message: 'Status must be provided as a string' });
  }
  const normalizedStatus = status.trim().toLowerCase();
  if (!['pending', 'completed'].includes(normalizedStatus)) {
    return res.status(400).json({
      success: false,
      message: 'Status must be either "pending" or "completed"'
    });
  }

  // Show none existing task status to the user
  if (tasks.filter(t => t.status === normalizedStatus).length === 0) {
    return res.status(404).json({
      success: false,
      message: `No tasks found with status "${normalizedStatus}"`
    });
  }

  const filteredTasks = tasks.filter(t => String(t.status).trim().toLowerCase() === normalizedStatus);

  res.json({
    success: true,
    count: filteredTasks.length,
    status: normalizedStatus,
    data: filteredTasks
  });
};

// CREATE new task
exports.createTask = (req, res) => {
  const { title, description, status } = req.body;

  // Basic validation: title must be a non-empty string
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a task title (non-empty string)'
    });
  }

  // Validate status if provided (case-insensitive)
  if (status !== undefined && status !== null) {
    if (typeof status !== 'string' || !['pending', 'completed'].includes(status.trim().toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: 'Status must be either "pending" or "completed"'
      });
    }
  }

  const finalStatus = (status && typeof status === 'string')
    ? status.trim().toLowerCase()
    : 'pending';

  const finalDescription = (description && typeof description === 'string')
    ? capitalizeFirstLetter(description.trim())
    : '';
    
  const newTask = {
    id: currentId++,
    title: title.trim(),
    description: finalDescription, //normalized description
    status: finalStatus // normalized status (lowercase)
  };

  tasks.push(newTask);

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: newTask
  });
};

// UPDATE task
exports.updateTask = (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Task with ID ${req.params.id} not found`
    });
  }
  // Extract provided fields from body
  const { title, description, status } = req.body || {};

  // Update only provided fields
  if (title !== undefined) {
    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Title must be a non-empty string'
      });
    }
    tasks[taskIndex].title = title.trim();
  }

  if (description !== undefined) {
    // Accept non-string descriptions but coerce to string; trim if string
    tasks[taskIndex].description = typeof description === 'string' ? capitalizeFirstLetter(description.trim()) : String(description);
  }

  if (status !== undefined) {
    if (typeof status !== 'string' || !['pending', 'completed'].includes(status.trim().toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: 'Status must be either "pending" or "completed"'
      });
    }
    tasks[taskIndex].status = status.trim().toLowerCase();
  }
  
  res.json({
    success: true,
    message: 'Task updated successfully',
    data: tasks[taskIndex]
  });
};

// DELETE task
exports.deleteTask = (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Task with ID ${req.params.id} not found`
    });
  }
  
  const deletedTask = tasks.splice(taskIndex, 1)[0];
  
  res.json({
    success: true,
    message: 'Task deleted successfully',
    data: deletedTask
  });
};

// TOGGLE task status (bonus feature)
exports.toggleTaskStatus = (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Task with ID ${req.params.id} not found`
    });
  }
  
  // Toggle status
  tasks[taskIndex].status = tasks[taskIndex].status === 'pending' 
    ? 'completed' 
    : 'pending';
  
  res.json({
    success: true,
    message: `Task status toggled to ${tasks[taskIndex].status}`,
    data: tasks[taskIndex]
  });
};


// ============================================
// 🆕 BULK OPERATIONS
// ============================================

// BULK TOGGLE: Toggle all tasks with a specific status
exports.bulkToggleByStatus = (req, res) => {
  const { status } = req.params;

  //Validate status parameter
  if(typeof status !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Status must be provided as a string'
    });
  }

  const normalizedStatus = status.trim().toLowerCase();
  if (!['pending', 'completed'].includes(normalizedStatus)) {
    return res.status(400).json({
      success: false,
      message: 'Status must be either "pending" or "completed"'
    });
  }

  // Find all tasks with the specified status
  const tasksToToggle = tasks.filter(t => String(t.status).trim().toLowerCase() === normalizedStatus);
  
  // Check if there are any tasks to toggle
  if (tasksToToggle.length === 0) {
    return res.status(404).json({
      success: false,
      message: `No tasks found with status "${normalizedStatus} to toggle"`
    });
  }
  
  //Determine the new status (opposite of current status)
  const newStatus = normalizedStatus === 'pending' ? 'completed' : 'pending';
  
  //Toggle all matching tasks
  let toggledCount = 0;
  tasks.forEach(task => {
    if (String(task.status).trim().toLowerCase() === normalizedStatus) {
      task.status = newStatus;
      toggledCount++;
    } 
  });
  
  res.json({
    success: true,
    message: `Successfully toggled ${toggledCount} task(s) from "${normalizedStatus}" to "${newStatus}"`,
    data: {
      oldStatus: normalizedStatus,
      newStatus: newStatus,
      affectedTasks: toggledCount
    }
  });
};

//BULK TOGGLE: Toggle ALL tasks (regardless of status)
exports.bulkToggleAll = (req, res) => {
  //Check if there are any tasks
  if (tasks.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'No tasks available to toggle'
    });
  }

  //Track changes
  let pendingToCompleted = 0;
  let completedToPending = 0;

  //Toggle every task
  tasks.forEach(task => {
    if (task.status === 'pending') {
      task.status = 'completed';
      pendingToCompleted++;
    } else if (task.status === 'completed') {
      task.status = 'pending';
      completedToPending++;
    }
  });


  res.json({
    success: true,
    message: `Successfully toggled all ${tasks.length} task(s)`,
    count: tasks.length,
    data: {
      totalToggled: tasks.length,
      pendingToCompleted: pendingToCompleted,
      completedToPending: completedToPending
    }
  });
};

//BULK DELETE: Delete all tasks with a specific status
exports.bulkDeleteByStatus = (req, res) => {
  const {status} = req.params;
  
  //Validate status parameter
  if (typeof status !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Status must be provided as a string'
    });
  }

  const normalizedStatus = status.trim().toLowerCase();

  if (!['pending', 'completed'].includes(normalizedStatus)) {
    return res.status(400).json({
      success: false,
      message: 'Status must be either "pending" or "completed"'
    });
  }

  //Find tasks to delete
  const tasksToDelete = tasks.filter(t => String(t.status).trim().toLowerCase() === normalizedStatus);

  //Check if there are any tasks to delete
  if (tasksToDelete.length === 0) {
    return res.status(404).json({
      success: false,
      message: `No ${normalizedStatus} tasks found to delete`
    });
  }

  //Store count and delete tasks info before deletion
  const deletedCount = tasksToDelete.length;
  const deletedTaskIds = tasksToDelete.map(t => t.id);

  //Filter out tasks with specified status (keeping others)
  // Remove tasks with the specified status in-place
  for (let i = tasks.length - 1; i >= 0; i--) {
    if (String(tasks[i].status).trim().toLowerCase() === normalizedStatus) {
      tasks.splice(i, 1);
    }
  }

  res.json({
    success: true,
    message: `Successfully deleted ${deletedCount} ${normalizedStatus} task(s)`,
    data: {
      deletedCount: deletedCount,
      deletedTaskIds: deletedTaskIds,
      remainingTasks: tasks.length,
      deletedStatus: normalizedStatus
    }
  });
};

//Bulk DELETE: Delete ALL tasks (with safety check)
exports.bulkDeleteAll = (req, res) => {
  const { confirm } = req.query; 

  if (confirm !== 'true') {
    return res.status(400).json({
      success: false,
      message: 'Bulk delete all tasks requires confirmation. Add ?confirm=true to the URL to proceed.',
      warning: 'This will permanently delete All tasks!',
      tasksCount: tasks.length
    });
  }

  //Store information before deletion
  const deletedCount = tasks.length;
  const deletedTaskIds = tasks.map(t => t.id);

  //Clear all tasks
  tasks.length = 0;

  res.json({
    success: true,
    message: `Successfully deleted all ${deletedCount} task(s)`,
    count: deletedCount,
    data: {
      deletedCount: deletedCount,
      deletedTaskIds: deletedTaskIds,
      remainingTasks: 0
    }
  });
};