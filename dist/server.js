"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const db_1 = __importDefault(require("./config/db"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3001;
app.use(body_parser_1.default.json());
(0, db_1.default)();
app.get('/', (req, res) => {
    res.send('Rest API is workingsss');
});
app.use('/', index_1.default);
app.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(`Server started on ${url}`);
});
