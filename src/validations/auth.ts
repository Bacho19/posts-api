const { body } = require('express-validator');

export const registrationValidator = [
    body('email').isEmail().withMessage('Invalid email'),
    body('firstName')
        .isLength({ min: 4 })
        .withMessage('First name must be at least 4 characters'),
    body('lastName')
        .isLength({ min: 4 })
        .withMessage('Last name must be at least 4 characters'),
    body('password')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters'),
];

export const loginValidator = [
    body('email').isEmail().withMessage('Invalid email'),
];
