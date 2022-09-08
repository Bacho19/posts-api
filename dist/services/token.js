"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenService {
    genarateToken(payload) {
        var _a;
        const accessToken = jsonwebtoken_1.default.sign(payload, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : '', {
            expiresIn: '1d',
        });
        return accessToken;
    }
}
exports.default = new TokenService();
//# sourceMappingURL=token.js.map