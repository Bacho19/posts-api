import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { isAuth } from '../middlewares/auth';
import { PostsEntity as Post } from '../entities/Post';
import { UserEntity as User } from '../entities/User';
import { postValidator } from '../validations/posts';

const router = express.Router();

router.post('/', [isAuth, ...postValidator], async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            body,
            imageUrl,
        } = req.body;
        
        const token = req.headers.authorization?.split(' ')[1];
     
        const tokenFields = jwt.verify(token ?? '', process.env.JWT_SECRET ?? '');

        const user = await User.findOneBy({ userId: tokenFields.id });

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
        return res.status(500).json('Something went wrong, please try again');
    }
});

router.get('/', isAuth, async (_, res) => {
    try {
        const posts = await Post.find();

        return res.json(posts);
    } catch (e) {
        return res.status(500).json('Something went wrong, please try again');
    }
});

export default router;
