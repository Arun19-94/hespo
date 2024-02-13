"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandlier = (error, res, req, next) => {
    const status = error.status || 500;
    const errorType = error.errorType || "CUSTOM";
    const message = error.message || 'Something went wrong';
    res.status(status).send({
        message,
        status,
    });
};
exports.default = errorHandlier;
