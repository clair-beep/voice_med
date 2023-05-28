"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThis = void 0;
const getThis = function (req, res) {
    res.status(200).json({ name: 'john' });
};
exports.getThis = getThis;
