import {Request, Response, NextFunction} from 'express';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        next();
    } else {
        res.status(400).json({ message: 'no access' });
    }
};
