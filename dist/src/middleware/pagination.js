"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchAndPaginationMiddleware = void 0;
var searchAndPaginationMiddleware = function (req, // Use ExtendedRequest instead of Request
res, next) {
    var page = parseInt(req.query.page, 10) || 1;
    var limit = parseInt(req.query.limit, 10) || 10;
    var startIndex = (page - 1) * limit;
    var endIndex = page * limit;
    req.pagination = {
        page: page,
        limit: limit,
        startIndex: startIndex,
        endIndex: endIndex,
    };
    next();
};
exports.searchAndPaginationMiddleware = searchAndPaginationMiddleware;
