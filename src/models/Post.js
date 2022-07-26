const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    text: {
        type: String,
        require: true,
    },
    tags: {
        type: Array,
        default: [],
    },
    title: {
        type: String,
        require: true,
    },
    imageUrl: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Post', PostSchema);
