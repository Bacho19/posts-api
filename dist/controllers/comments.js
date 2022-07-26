"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const PostComments_1 = require("../entities/PostComments");
const User_1 = require("../entities/User");
const Post_1 = require("../entities/Post");
class CommentsController {
    async createComment(req, res) {
        var _a, _b;
        try {
            const { id } = req.params;
            const { text } = req.body;
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
            const newComment = PostComments_1.PostCommentsEntity.create();
            newComment.text = text;
            newComment.user = user;
            newComment.post = post;
            await newComment.save();
            return res.json(newComment);
        }
        catch (e) {
            return res
                .status(500)
                .json('Something went wrong, please try again');
        }
    }
    async getComments(req, res) {
        try {
            const { id } = req.params;
            const comments = await PostComments_1.PostCommentsEntity.createQueryBuilder('post_comments')
                .where('post_comments.post_id = :id', { id })
                .innerJoin('post_comments.post', 'posts')
                .innerJoin('post_comments.user', 'users')
                .addSelect([
                'users.email',
                'users.firstName',
                'users.lastName',
                'users.avatarUrl',
            ])
                .getMany();
            return res.json(comments);
        }
        catch (e) {
            return res
                .status(500)
                .json('Something went wrong, please try again');
        }
    }
    async deleteComment(req, res) {
        var _a, _b;
        try {
            const { id } = req.params;
            const comment = await PostComments_1.PostCommentsEntity.createQueryBuilder('post_comments')
                .innerJoinAndSelect('post_comments.user', 'users')
                .where('post_comments.comment_id = :id', { id })
                .getOne();
            if (!comment) {
                return res.status(400).json({ msg: 'comment not found' });
            }
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            const tokenFields = jsonwebtoken_1.default.verify(token !== null && token !== void 0 ? token : '', (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : '');
            if (comment.user.email != tokenFields.email) {
                return res.status(400).json({
                    msg: 'you have no permission to delete this comment',
                });
            }
            await PostComments_1.PostCommentsEntity.delete(id);
            return res.json({ msg: 'post was deleted' });
        }
        catch (e) {
            return res
                .status(500)
                .json('Something went wrong, please try again');
        }
    }
}
exports.default = new CommentsController();
//# sourceMappingURL=comments.js.map