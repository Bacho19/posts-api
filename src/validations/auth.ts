const { body } = require('express-validator');

export const registrationValidator = [
    body('email').isEmail(),
    body('firstName').isLength({ min: 4 }),
    body('lastName').isLength({ min: 4 }),
    body('password').isLength({ min: 5 }),
];

export const loginValidator = [body('email').isEmail()];
