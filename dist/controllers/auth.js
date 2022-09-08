"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../entities/User");
const token_1 = __importDefault(require("../services/token"));
class AuthController {
    async register(req, res) {
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
                    .json({ message: 'User with this email already exists' });
            }
            const salt = await bcrypt_1.default.genSalt(10);
            const hashedPassword = await bcrypt_1.default.hash(password, salt);
            const user = User_1.UserEntity.create();
            user.fullName = fullName;
            user.email = email;
            user.avatarUrl = avatarUrl;
            user.password = hashedPassword;
            user.save();
            const token = token_1.default.genarateToken({ email });
            const resUser = {
                email: user.email,
                fullName: user.fullName,
                avatarUrl: (_a = user.avatarUrl) !== null && _a !== void 0 ? _a : null,
                token,
            };
            return res.status(200).json(resUser);
        }
        catch (e) {
            return res
                .status(500)
                .json({ message: 'Something went wrong, please try again' });
        }
    }
    async login(req, res) {
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
            const token = token_1.default.genarateToken({
                email: candidateUser.email,
            });
            const resUser = {
                email: candidateUser.email,
                fullName: candidateUser.fullName,
                avatarUrl: candidateUser.avatarUrl,
                token,
            };
            return res.json(resUser);
        }
        catch (e) {
            return res
                .status(500)
                .json({ message: 'Something went wrong, please try again' });
        }
    }
    async me(req, res) {
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
            res.status(401).json({
                message: 'User is unauthorized',
            });
        }
    }
}
exports.default = new AuthController();
//# sourceMappingURL=auth.js.map