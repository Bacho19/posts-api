const express = require('express');
const { isAuth } = require('../middlewares/auth');
const Post = require('../models/Post');

const router = express.Router();

router.post('/', isAuth, async (req, res) => {
    try {
        const {
            imageUrl,
            tags,
            text,
            title,
            user,
        } = req.body;
        const newPost = new Post({imageUrl, tags, text, title, user});
        
        newPost.save();

        res.json(newPost);
    } catch (e) {
        res.status(500).json('Something went wrong, please try again');
    }
});

router.get('/', isAuth, async (req, res) => {
    try {
        const posts = await Post.find();

        res.json(posts);
    } catch (e) {
        res.status(500).json('Something went wrong, please try again');
    }
});

module.exports = router;
