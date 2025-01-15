const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  createTask,
  markCompleted,
  deleteTask
} = require('../controllers/taskController');

// GET /tasks: Retrieve a list of tasks
// POST /tasks: Create a new task
router.route('/')
  .get(getAllTasks)
  .post(createTask);

// PATCH /tasks/:id Mark a task as completed
// DELETE /tasks/:id Delete a task
router.route('/:id')
  .patch(markCompleted)
  .delete(deleteTask);

module.exports = router;