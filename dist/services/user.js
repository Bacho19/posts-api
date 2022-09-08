"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../services/token"));
const User_1 = require("../entities/User");
class UserService {
    async register(email, fullName, password, avatarUrl) {
        var _a;
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
        return resUser;
    }
}
exports.default = new UserService();
//# sourceMappingURL=user.js.map