"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post('/', auth_1.isAuth, async (req, res) => {
    try {
        const { imageUrl, tags, text, title, user, } = req.body;
        const newPost = new Post({ imageUrl, tags, text, title, user });
        newPost.save();
        res.json(newPost);
    }
    catch (e) {
        res.status(500).json('Something went wrong, please try again');
    }
});
router.get('/', auth_1.isAuth, async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    }
    catch (e) {
        res.status(500).json('Something went wrong, please try again');
    }
});
module.exports = router;
//# sourceMappingURL=posts.js.map