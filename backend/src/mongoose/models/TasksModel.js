import mongoose, { Schema } from "mongoose"

const TaskSchema = new Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    { timestamps: true }
)

// Create a Task model
const Tasks = mongoose.model('Task', TaskSchema)

export default Tasks