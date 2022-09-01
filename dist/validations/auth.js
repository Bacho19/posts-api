"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.registrationValidator = void 0;
const { body } = require('express-validator');
exports.registrationValidator = [
    body('email').isEmail(),
    body('fullName').isLength({ min: 4 }),
    body('password').isLength({ min: 5 }),
];
exports.loginValidator = [body('email').isEmail()];
//# sourceMappingURL=auth.js.map