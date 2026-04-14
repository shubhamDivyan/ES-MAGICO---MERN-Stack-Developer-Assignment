const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createTask, getProjectTasks, updateTask, deleteTask } = require('../controllers/taskController');


router.post('/create/:projectId', auth, createTask);
router.get('/:projectId', auth, getProjectTasks);
router.put('/update/:taskId', auth, updateTask);
router.delete('/:taskId', auth, deleteTask);

module.exports = router;