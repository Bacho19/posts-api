import { body } from 'express-validator';

export const postValidator = [
    body('title').isLength({ min: 5 }),
    body('body').isLength({ min: 5 }),
    body('imageUrl').optional().isLength({ min: 5 }).isURL(),
];
