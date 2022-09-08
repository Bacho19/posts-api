"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../validations/auth");
const auth_2 = require("../middlewares/auth");
const auth_3 = __importDefault(require("../controllers/auth"));
const router = (0, express_1.Router)();
router.post('/register', auth_1.registrationValidator, auth_3.default.register);
router.post('/login', auth_1.loginValidator, auth_3.default.login);
router.get('/me', auth_2.isAuth, auth_3.default.me);
exports.default = router;
//# sourceMappingURL=auth.js.map