import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import bodyParser from 'body-parser'
const cors = require('cors');

// import mongoose connection file
import './mongoose/connection'

// import the routes
import TaskRoutes from './routes/taskManagerRoute'
import authRoutes from './routes/authRoutes'

// // Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Routes
app.use('/tasks', TaskRoutes)
app.use('/auth', authRoutes)


// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});