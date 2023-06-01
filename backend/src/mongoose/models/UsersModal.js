import mongoose from 'mongoose'

// Define the user schema
const userSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
},
    {
        timestamps: true
    }
)

// Create the User model
const User = mongoose.model('User', userSchema);

export default User