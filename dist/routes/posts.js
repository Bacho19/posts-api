"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const posts_1 = require("../validations/posts");
const posts_2 = __importDefault(require("../controllers/posts"));
const router = (0, express_1.Router)();
router.post('/', [auth_1.isAuth, ...posts_1.postValidator], posts_2.default.createNewPost);
router.get('/', auth_1.isAuth, posts_2.default.getAllPosts);
router.get('/:id', auth_1.isAuth, posts_2.default.getOnePost);
router.delete('/:id', auth_1.isAuth, posts_2.default.deleteOnePost);
exports.default = router;
//# sourceMappingURL=posts.js.map