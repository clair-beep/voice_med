"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestTime = void 0;
var requestTime = function (req, res, next) {
    req.requestTime = Date.now();
    next();
};
exports.requestTime = requestTime;
