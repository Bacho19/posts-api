"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const comments_1 = __importDefault(require("../controllers/comments"));
const router = (0, express_1.Router)();
router.post('/:id', auth_1.isAuth, comments_1.default.createComment);
router.get('/:id', auth_1.isAuth, comments_1.default.getComments);
exports.default = router;
//# sourceMappingURL=comments.js.map