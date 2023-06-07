"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
var db_1 = require("./config/db");
var body_parser_1 = __importDefault(require("body-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
var express_handlebars_1 = require("express-handlebars");
var path_1 = __importDefault(require("path"));
function createServer() {
    dotenv_1.default.config();
    var app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    (0, db_1.connectDB)();
    app.use(express_1.default.static('public'));
    app.engine('handlebars', (0, express_handlebars_1.engine)());
    app.set('view engine', 'handlebars');
    // app.set('views', './views');
    app.set('views', path_1.default.join(__dirname, '..', '../views'));
    app.use('/', index_1.default);
    return app; // Return the app instance
}
exports.default = createServer;
