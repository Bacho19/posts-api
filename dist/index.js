"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
const loadDatabase = async () => {
    try {
        await data_source_1.AppDataSource.initialize();
        console.log('database was connected');
    }
    catch (e) {
        console.log(e);
        throw Error('Error: database wasn\'t connected');
    }
};
app.listen(PORT, () => {
    console.log(`server was started on port ${PORT}`);
    loadDatabase();
});
//# sourceMappingURL=index.js.map