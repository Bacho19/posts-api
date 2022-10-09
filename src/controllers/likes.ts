import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PostsEntity as Posts } from '../entities/Post';
import { PostLikesEntity as PostLikes } from '../entities/PostLikes';
import { UserEntity as User } from '../entities/User';
import { DecodedTokenFields } from 'src/types';

class LikesController {
    async likePost(req: Request, res: Response) {
        try {
            const { id } = req.params;

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

            const candidateLike = await PostLikes.createQueryBuilder(
                'post_likes'
            )
                .where(
                    'post_likes.post_id = :postId and post_likes.user_id = :userId',
                    { postId: post.postId, userId: user.userId }
                )
                .getOne();

            if (candidateLike) {
                return res
                    .status(400)
                    .json({ message: 'you have already liked this post' });
            }

            const newLike = PostLikes.create();

            newLike.post = post;
            newLike.user = user;

            await newLike.save();

            return res.json({ message: 'post was liked' });
        } catch (e) {
            return res.status(400).json({ message: 'Something went wron' });
        }
    }

    async dislikePost(req: Request, res: Response) {
        try {
            const { id } = req.params;

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

            const candidateLike = await PostLikes.createQueryBuilder(
                'post_likes'
            )
                .where(
                    'post_likes.post_id = :postId and post_likes.user_id = :userId',
                    { postId: post.postId, userId: user.userId }
                )
                .getOne();

            if (!candidateLike) {
                return res
                    .status(400)
                    .json({ message: "you haven't liked this post" });
            }

            await candidateLike.remove();

            return res.json({ message: 'post was disliked' });
        } catch (e) {
            return res.status(400).json({ message: 'Something went wron' });
        }
    }

    getLikes(req: Request, res: Response) {
        const { id } = req.params;

        res.json(id);
    }
}

export default new LikesController();
