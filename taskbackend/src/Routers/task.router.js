const express = require('express')
const taskRouter = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const { addTaskController, getAllTaskController, deleteTaskController, updateTaskController } = require('../controllers/task.controller');

// connecting all controller here
taskRouter.post('/add-task',addTaskController) 
taskRouter.get('/total-task',getAllTaskController)
taskRouter.delete('/delete-task/:taskId',deleteTaskController)
taskRouter.patch('/update-task/:taskId',updateTaskController)

module.exports = taskRouter