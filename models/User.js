const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    time_slot: {
        type: String,
        required:true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    paid: {
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model('user', userSchema);