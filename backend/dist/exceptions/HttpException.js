"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(status, message, errorType) {
        super(message);
        this.status = status;
        this.message = message;
        this.errorType = errorType;
    }
}
exports.default = HttpException;
