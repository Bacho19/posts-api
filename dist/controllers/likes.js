"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Post_1 = require("../entities/Post");
const PostLikes_1 = require("../entities/PostLikes");
const User_1 = require("../entities/User");
class LikesController {
    async likePost(req, res) {
        var _a, _b;
        try {
            const { id } = req.params;
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            const tokenFields = jsonwebtoken_1.default.verify(token !== null && token !== void 0 ? token : '', (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : '');
            const user = await User_1.UserEntity.findOneBy({
                email: tokenFields.email,
            });
            if (!user) {
                return res.status(400).json({ msg: 'user not found' });
            }
            const post = await Post_1.PostsEntity.findOneBy({
                postId: Number(id),
            });
            if (!post) {
                return res.status(400).json({ msg: 'post not found' });
            }
            const candidateLike = await PostLikes_1.PostLikesEntity.createQueryBuilder('post_likes')
                .where('post_likes.post_id = :postId and post_likes.user_id = :userId', { postId: post.postId, userId: user.userId })
                .getOne();
            if (candidateLike) {
                return res
                    .status(400)
                    .json({ message: 'you have already liked this post' });
            }
            const newLike = PostLikes_1.PostLikesEntity.create();
            newLike.post = post;
            newLike.user = user;
            await newLike.save();
            return res.json({ message: 'post was liked' });
        }
        catch (e) {
            return res.status(400).json({ message: 'Something went wron' });
        }
    }
    async dislikePost(req, res) {
        var _a, _b;
        try {
            const { id } = req.params;
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            const tokenFields = jsonwebtoken_1.default.verify(token !== null && token !== void 0 ? token : '', (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : '');
            const user = await User_1.UserEntity.findOneBy({
                email: tokenFields.email,
            });
            if (!user) {
                return res.status(400).json({ msg: 'user not found' });
            }
            const post = await Post_1.PostsEntity.findOneBy({
                postId: Number(id),
            });
            if (!post) {
                return res.status(400).json({ msg: 'post not found' });
            }
            const candidateLike = await PostLikes_1.PostLikesEntity.createQueryBuilder('post_likes')
                .where('post_likes.post_id = :postId and post_likes.user_id = :userId', { postId: post.postId, userId: user.userId })
                .getOne();
            if (!candidateLike) {
                return res
                    .status(400)
                    .json({ message: "you haven't liked this post" });
            }
            await candidateLike.remove();
            return res.json({ message: 'post was disliked' });
        }
        catch (e) {
            return res.status(400).json({ message: 'Something went wron' });
        }
    }
    getLikes(req, res) {
        const { id } = req.params;
        res.json(id);
    }
}
exports.default = new LikesController();
//# sourceMappingURL=likes.js.map