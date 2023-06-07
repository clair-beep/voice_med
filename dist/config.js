"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
// Parsing the env file.
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../config/config.env') });
// Loading process.env as ENV interface
var getConfig = function () {
    return {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
        MONGO_URI: process.env.MONGO_URI,
    };
};
// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.
var getSanitzedConfig = function (config) {
    for (var _i = 0, _a = Object.entries(config); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        if (value === undefined) {
            throw new Error("Missing key ".concat(key, " in config.env"));
        }
    }
    return config;
};
var config = getConfig();
var sanitizedConfig = getSanitzedConfig(config);
exports.default = sanitizedConfig;
