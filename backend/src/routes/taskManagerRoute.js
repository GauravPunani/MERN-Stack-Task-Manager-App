import express from 'express'

// controller imports
import getTasksController from '../controllers/tasks/getTasksController'
import createTaskController from '../controllers/tasks/createTasksController'
import getTaskByIdController from '../controllers/tasks/getTaskByIdController'
import deleteTaskController from '../controllers/tasks/deleteTasksController'
import udpateTaskController from '../controllers/tasks/updateTasksController'

// middleware imports
import authMiddleware from '../middlewares/authMiddleware'
import completeTaskController from '../controllers/tasks/completeTaskController'

// create router instance
const router = express.Router()

// Get all tasks
router.get('/', authMiddleware, getTasksController)

// Create a task
router.post('/', authMiddleware, createTaskController)

// Create a task
router.post('/:id/complete', authMiddleware, completeTaskController)

// Get a task by ID
router.get('/:id', authMiddleware, getTaskByIdController)

// Update a task
router.put('/:id', authMiddleware, udpateTaskController)

// Delete a task
router.delete('/:id', authMiddleware, deleteTaskController)

export default router