const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ['admin','customer']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = new mongoose.model('User', UserSchema);