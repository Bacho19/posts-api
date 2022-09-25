"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.registrationValidator = void 0;
const { body } = require('express-validator');
exports.registrationValidator = [
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
exports.loginValidator = [
    body('email').isEmail().withMessage('Invalid email'),
];
//# sourceMappingURL=auth.js.map