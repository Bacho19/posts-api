"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidator = void 0;
const express_validator_1 = require("express-validator");
exports.postValidator = [
    (0, express_validator_1.body)('title').isLength({ min: 5 }),
    (0, express_validator_1.body)('body').isLength({ min: 5 }),
    (0, express_validator_1.body)('imageUrl').optional().isLength({ min: 5 }).isURL(),
];
//# sourceMappingURL=posts.js.map