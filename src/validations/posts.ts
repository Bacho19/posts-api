import { body } from 'express-validator';

export const postValidator = [
    body('title').isLength({ min: 1 }),
    body('body').isLength({ min: 1 }),
    // body('imageUrl').isURL().optional(),
];
