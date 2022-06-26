const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    fullName: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    avatarUrl: String,
},
{
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
