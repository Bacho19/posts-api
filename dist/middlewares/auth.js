"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuth = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (token) {
        try {
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            return next();
        }
        catch (e) {
            return res.status(401).json({ message: 'User is unauthorized' });
        }
    }
    else {
        return res.status(401).json({ message: 'User is unauthorized' });
    }
};
exports.isAuth = isAuth;
//# sourceMappingURL=auth.js.map