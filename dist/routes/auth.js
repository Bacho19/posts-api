"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../validations/auth");
const auth_2 = require("../middlewares/auth");
const User_1 = require("../entities/User");
const router = (0, express_1.Router)();
router.post('/register', auth_1.registrationValidator, async (req, res) => {
    var _a;
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password, fullName, avatarUrl } = req.body;
        const candidateUser = await User_1.UserEntity.findOneBy({ email });
        if (candidateUser) {
            return res
                .status(400)
                .json({ message: 'user with this email already exists' });
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const user = User_1.UserEntity.create();
        user.fullName = fullName;
        user.email = email;
        user.avatarUrl = avatarUrl;
        user.password = hashedPassword;
        user.save();
        const token = jsonwebtoken_1.default.sign({
            email: user.email,
        }, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : '', { expiresIn: '1d' });
        const resUser = {
            id: user.userId,
            email: user.email,
            fullName: user.fullName,
            token,
        };
        return res.status(200).json(resUser);
    }
    catch (e) {
        return res
            .status(500)
            .json({ message: 'Something went wrong, please try again' });
    }
});
router.post('/login', auth_1.loginValidator, async (req, res) => {
    var _a;
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        const candidateUser = await User_1.UserEntity.findOneBy({ email });
        if (!candidateUser) {
            return res
                .status(400)
                .json({ message: 'Invalid email or password' });
        }
        const isValidPassword = await bcrypt_1.default.compare(password, candidateUser.password);
        if (!isValidPassword) {
            return res
                .status(400)
                .json({ message: 'Invalid email or password' });
        }
        const token = jsonwebtoken_1.default.sign({
            email: candidateUser.email,
        }, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : '', { expiresIn: '1d' });
        const resUser = {
            id: candidateUser.userId,
            email: candidateUser.email,
            fullName: candidateUser.fullName,
            token,
        };
        return res.json(resUser);
    }
    catch (e) {
        return res
            .status(500)
            .json({ message: 'Something went wrong, please try again' });
    }
});
router.get('/me', auth_2.isAuth, async (req, res) => {
    var _a, _b;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const tokenFields = jsonwebtoken_1.default.verify(token !== null && token !== void 0 ? token : '', (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : '');
        const user = await User_1.UserEntity.findOneBy({
            email: tokenFields.email,
        });
        res.json(user);
    }
    catch (e) {
        res.status(500).json({
            message: 'Something went wrong, please try again',
        });
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map