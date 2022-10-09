"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./data-source");
const auth_1 = __importDefault(require("./routes/auth"));
const posts_1 = __importDefault(require("./routes/posts"));
const comments_1 = __importDefault(require("./routes/comments"));
const likes_1 = __importDefault(require("./routes/likes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
}));
app.use(express_1.default.json());
app.use('/auth', auth_1.default);
app.use('/posts', posts_1.default);
app.use('/comments', comments_1.default);
app.use('/likes', likes_1.default);
const loadDatabase = async () => {
    try {
        await data_source_1.AppDataSource.initialize();
        console.log('database was connected');
    }
    catch (e) {
        console.log(e);
        throw Error("Error: database wasn't connected");
    }
};
app.listen(PORT, () => {
    console.log(`server was started on port ${PORT}`);
    loadDatabase();
});
//# sourceMappingURL=index.js.map