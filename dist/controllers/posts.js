"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const PostLikes_1 = require("../entities/PostLikes");
const Post_1 = require("../entities/Post");
const User_1 = require("../entities/User");
class PostsController {
    async createNewPost(req, res) {
        var _a, _b;
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { title, body, imageUrl } = req.body;
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            const tokenFields = jsonwebtoken_1.default.verify(token !== null && token !== void 0 ? token : '', (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : '');
            const user = await User_1.UserEntity.findOneBy({
                email: tokenFields.email,
            });
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
            return res
                .status(500)
                .json('Something went wrong, please try again');
        }
    }
    async getAllPosts(_, res) {
        try {
            const posts = await Post_1.PostsEntity.find();
            return res.json(posts);
        }
        catch (e) {
            return res
                .status(500)
                .json('Something went wrong, please try again');
        }
    }
    async getOnePost(req, res) {
        var _a, _b;
        try {
            const id = Number(req.params.id);
            const post = await Post_1.PostsEntity.createQueryBuilder('posts')
                .where('posts.post_id = :id', { id })
                .innerJoin('posts.user', 'users')
                .addSelect([
                'users.email',
                'users.firstName',
                'users.lastName',
                'users.avatarUrl',
            ])
                .getOne();
            const likesCount = await PostLikes_1.PostLikesEntity.createQueryBuilder('post_likes')
                .where('post_likes.post_id = :id', { id })
                .select()
                .getCount();
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            const tokenFields = jsonwebtoken_1.default.verify(token !== null && token !== void 0 ? token : '', (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : '');
            const user = await User_1.UserEntity.findOneBy({
                email: tokenFields.email,
            });
            if (!user) {
                return res.status(400).json({ msg: 'user not found' });
            }
            const isPostLiked = await PostLikes_1.PostLikesEntity.createQueryBuilder('post_likes')
                .where('post_likes.post_id = :postId and post_likes.user_id = :userId', { postId: id, userId: user.userId })
                .select()
                .getOne();
            if (post) {
                return res.json(Object.assign(Object.assign({}, post), { isLiked: Boolean(isPostLiked), likesCount }));
            }
            else {
                return res.status(400).json({ message: 'No post found' });
            }
        }
        catch (e) {
            return res
                .status(500)
                .json('Something went wrong, please try again');
        }
    }
    async deleteOnePost(req, res) {
        var _a, _b;
        try {
            const id = Number(req.params.id);
            const post = await Post_1.PostsEntity.createQueryBuilder('posts')
                .innerJoinAndSelect('posts.user', 'users')
                .where('posts.post_id = :id', { id })
                .getOne();
            if (!post) {
                return res.status(400).json({ msg: 'post not found' });
            }
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            const tokenFields = jsonwebtoken_1.default.verify(token !== null && token !== void 0 ? token : '', (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : '');
            if (post.user.email != tokenFields.email) {
                return res.status(400).json({
                    msg: 'you have no permission to delete this post',
                });
            }
            await Post_1.PostsEntity.delete(id);
            return res.json({ msg: 'post was deleted' });
        }
        catch (e) {
            return res
                .status(500)
                .json('Something went wrong, please try again');
        }
    }
}
exports.default = new PostsController();
//# sourceMappingURL=posts.js.map