import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { DecodedTokenFields } from '../types';
import { PostCommentsEntity as PostComments } from '../entities/PostComments';
import { UserEntity as User } from '../entities/User';
import { PostsEntity as Posts } from '../entities/Post';

class CommentsController {
    async createComment(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const { text } = req.body;

            const token = req.headers.authorization?.split(' ')[1];

            const tokenFields = jwt.verify(
                token ?? '',
                process.env.JWT_SECRET ?? ''
            );

            const user = await User.findOneBy({
                email: (<DecodedTokenFields>tokenFields).email,
            });

            if (!user) {
                return res.status(400).json({ msg: 'user not found' });
            }

            const post = await Posts.findOneBy({
                postId: Number(id),
            });

            if (!post) {
                return res.status(400).json({ msg: 'post not found' });
            }

            const newComment = PostComments.create();

            newComment.text = text;
            newComment.user = user;
            newComment.post = post;

            await newComment.save();

            return res.json(newComment);
        } catch (e) {
            return res
                .status(500)
                .json('Something went wrong, please try again');
        }
    }

    async getComments(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const comments = await PostComments.createQueryBuilder(
                'post_comments'
            )
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
        } catch (e) {
            return res
                .status(500)
                .json('Something went wrong, please try again');
        }
    }
}

export default new CommentsController();
