"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.registrationValedator = void 0;
const { body } = require('express-validator');
exports.registrationValedator = [
    body('email').isEmail(),
    body('fullName').isLength({ min: 4 }),
    body('password').isLength({ min: 5 }),
];
exports.loginValidator = [
    body('email').isEmail(),
];
//# sourceMappingURL=auth.js.map