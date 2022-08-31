"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const auth_1 = require("../middlewares/auth");
const Post_1 = require("../entities/Post");
const User_1 = require("../entities/User");
const posts_1 = require("../validations/posts");
const router = express_1.default.Router();
router.post('/', [auth_1.isAuth, ...posts_1.postValidator], async (req, res) => {
    var _a, _b;
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, body, imageUrl, } = req.body;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const tokenFields = jsonwebtoken_1.default.verify(token !== null && token !== void 0 ? token : '', (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : '');
        const user = await User_1.UserEntity.findOneBy({ userId: tokenFields.id });
        if (!user) {
            return res.status(400).json({ msg: 'user not found' });
        }
        const newPost = Post_1.PostsEntity.create();
        newPost.title = title;
        newPost.body = body;
        newPost.imageUrl = imageUrl;
        newPost.user = user;
        await newPost.save();
        return res.json(newPost);
    }
    catch (e) {
        return res.status(500).json('Something went wrong, please try again');
    }
});
router.get('/', auth_1.isAuth, async (_, res) => {
    try {
        const posts = await Post_1.PostsEntity.find();
        return res.json(posts);
    }
    catch (e) {
        return res.status(500).json('Something went wrong, please try again');
    }
});
exports.default = router;
//# sourceMappingURL=posts.js.map