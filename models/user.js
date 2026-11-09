
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    rollNumber: {
        type: String,
        required: true
    },
    casualLeave: {
        type: Number,
        default: 1,
        min: 0
    },
    medicalLeave: {
        type: Number,
        default: 2,
        min: 0
    },
    leaveApplications: [{
        leaveType: String,
        days: Number,
        appliedAt: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = mongoose.model("User", userSchema);