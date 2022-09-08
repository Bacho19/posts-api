"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const apiError_1 = require("../apiError");
const errorMiddleware = (err, _, res) => {
    console.log(err);
    console.log('here');
    if (err instanceof apiError_1.ApiError) {
        console.log('here');
        return res
            .status(err.status)
            .json({ message: err.message, errors: err.errors });
    }
    return res
        .status(500)
        .json({ message: 'Something went wrong, please try again' });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error.js.map