import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { PostLikesEntity as PostLikes } from '../entities/PostLikes';
import { PostsEntity as Post } from '../entities/Post';
import { UserEntity as User } from '../entities/User';
import { DecodedTokenFields } from '../types';

class PostsController {
    async createNewPost(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { title, body, imageUrl } = req.body;

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
            const newPost = Post.create();

            newPost.title = title;
            newPost.body = body;
            newPost.imageUrl = imageUrl;
            newPost.user = user;

            await newPost.save();

            return res.json(newPost);
        } catch (e) {
            return res
                .status(500)
                .json('Something went wrong, please try again');
        }
    }

    async getAllPosts(_: Request, res: Response) {
        try {
            const posts = await Post.find();

            return res.json(posts);
        } catch (e) {
            return res
                .status(500)
                .json('Something went wrong, please try again');
        }
    }

    async getOnePost(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const post = await Post.createQueryBuilder('posts')
                .where('posts.post_id = :id', { id })
                .innerJoin('posts.user', 'users')
                .addSelect([
                    'users.email',
                    'users.firstName',
                    'users.lastName',
                    'users.avatarUrl',
                ])
                .getOne();

            const likesCount = await PostLikes.createQueryBuilder('post_likes')
                .where('post_likes.post_id = :id', { id })
                .select()
                .getCount();

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

            const isPostLiked = await PostLikes.createQueryBuilder('post_likes')
                .where(
                    'post_likes.post_id = :postId and post_likes.user_id = :userId',
                    { postId: id, userId: user.userId }
                )
                .select()
                .getOne();

            if (post) {
                return res.json({
                    ...post,
                    isLiked: Boolean(isPostLiked),
                    likesCount,
                });
            } else {
                return res.status(400).json({ message: 'No post found' });
            }
        } catch (e) {
            return res
                .status(500)
                .json('Something went wrong, please try again');
        }
    }

    async getMyPosts(req: Request, res: Response) {
        try {
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

            const posts = await Post.createQueryBuilder('posts')
                .where('posts.user_id = :id', { id: user.userId })
                .getMany();

            return res.json(posts);
        } catch (e) {
            return res
                .status(500)
                .json('Something went wrong, please try again');
        }
    }

    async deleteOnePost(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const post = await Post.createQueryBuilder('posts')
                .innerJoinAndSelect('posts.user', 'users')
                .where('posts.post_id = :id', { id })
                .getOne();

            if (!post) {
                return res.status(400).json({ msg: 'post not found' });
            }

            const token = req.headers.authorization?.split(' ')[1];

            const tokenFields = jwt.verify(
                token ?? '',
                process.env.JWT_SECRET ?? ''
            );

            if (post.user.email != (<DecodedTokenFields>tokenFields).email) {
                return res.status(400).json({
                    msg: 'you have no permission to delete this post',
                });
            }

            await Post.delete(id);

            return res.json({ msg: 'post was deleted' });
        } catch (e) {
            return res
                .status(500)
                .json('Something went wrong, please try again');
        }
    }
}

export default new PostsController();
