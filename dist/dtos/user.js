"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDto {
    constructor(user) {
        var _a, _b;
        this.email = (_a = user === null || user === void 0 ? void 0 : user.email) !== null && _a !== void 0 ? _a : '';
        this.fullName = (_b = user === null || user === void 0 ? void 0 : user.fullName) !== null && _b !== void 0 ? _b : '';
        this.avatarUrl = user === null || user === void 0 ? void 0 : user.avatarUrl;
    }
}
exports.default = UserDto;
//# sourceMappingURL=user.js.map