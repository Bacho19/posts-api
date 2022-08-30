import {Request, Response, NextFunction} from 'express';

interface RequestAuthType extends Request {
    token: string
}

export const isAuth = (req: RequestAuthType, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        req.token = token;
        next();
    } else {
        res.status(400).json({ message: 'no access' });
    }
};
