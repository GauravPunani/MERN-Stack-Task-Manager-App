import mongoose from "mongoose";

// Connect to MongoDB
mongoose.connect('mongodb://localhost/task_manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})