"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = __importDefault(require("./HttpException"));
class CustomException extends HttpException_1.default {
    constructor(err) {
        super(400, err.toString(), "CustomException");
    }
}
exports.default = CustomException;
