"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var server_1 = __importDefault(require("./server"));
var port = 3001;
exports.app = (0, server_1.default)();
exports.app.listen(port, function () {
    var url = "http://localhost:".concat(port);
    console.log("Server started on ".concat(url));
});
