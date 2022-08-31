"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const isAuth = (req, res, next) => {
    if (req.headers.authorization) {
        next();
    }
    else {
        res.status(400).json({ message: 'no access' });
    }
};
exports.isAuth = isAuth;
//# sourceMappingURL=auth.js.map