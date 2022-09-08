import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET!);
            return next();
        } catch (e) {
            return res.status(401).json({ message: 'User is unauthorized' });
        }
    } else {
        return res.status(401).json({ message: 'User is unauthorized' });
    }
};
