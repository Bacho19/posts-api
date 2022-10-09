"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const likes_1 = __importDefault(require("../controllers/likes"));
const router = (0, express_1.Router)();
router.get('/:id', auth_1.isAuth, likes_1.default.getLikes);
router.post('/like/:id', auth_1.isAuth, likes_1.default.likePost);
router.post('/dislike/:id', auth_1.isAuth, likes_1.default.dislikePost);
exports.default = router;
//# sourceMappingURL=likes.js.map