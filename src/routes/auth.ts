import { Request, Response, Router } from "express";
import bcrypt from 'bcrypt';
import {validationResult} from 'express-validator';
import jwt from 'jsonwebtoken';
import {registrationValidator, loginValidator} from '../validations/auth';
import {isAuth} from '../middlewares/auth';
import {UserEntity as User} from '../entities/User'

const router = Router();

router.post('/register', registrationValidator, async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, fullName, avatarUrl } = req.body;

        const candidateUser = await User.findOneBy({ email });
        console.log(candidateUser);
        if (candidateUser) {
            return res.status(400).json({ message: 'user with this email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = User.create();
        user.fullName = fullName;
        user.email = email;
        user.avatarUrl = avatarUrl;
        user.password = hashedPassword;

        user.save();

        const token = jwt.sign({
            id: user.userId,
            email: user.email,
            fullName: user.fullName,
        }, process.env.JWT_SECRET ?? '', { expiresIn: '1d' });

        const resUser = {
            id: user.userId,
            email: user.email,
            fullName: user.fullName,
            token,
        }

        return res.status(200).json(resUser);
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});

router.post('/login', loginValidator, async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        const {email, password} = req.body;
    
        const candidateUser = await User.findOneBy({ email });
    
        if (!candidateUser) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isValidPassword = await bcrypt.compare(password, candidateUser.password);

        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({
            id: candidateUser.userId,
            email: candidateUser.email,
            fullName: candidateUser.fullName,
        }, process.env.JWT_SECRET ?? '', { expiresIn: '1d' });

        const resUser = {
            id: candidateUser.userId,
            email: candidateUser.email,
            fullName: candidateUser.fullName,
            token,
        };

        return res.json(resUser);
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});

router.get('/me', isAuth, async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
     
        const tokenFields = jwt.verify(token ?? '', process.env.JWT_SECRET ?? '');

        const user = await User.findOneBy({ userId: tokenFields.id });

        res.json(user);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});

export default router;
