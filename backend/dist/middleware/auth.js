"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.signJwt = exports.extractJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const extractJwt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (token) {
            let decode = yield jsonwebtoken_1.default.verify(token, config_1.config.token_secret);
            res.locals.user = decode;
            next();
        }
        else {
            return res.status(401).json({
                msg: "Unauthorised",
            });
        }
    }
    catch (error) {
        res.status(404).json({
            msg: error.message,
            error,
        });
    }
});
exports.extractJwt = extractJwt;
const signJwt = (_user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("signJwt-1");
    console.log(_user);
    let user = JSON.parse(JSON.stringify(_user));
    let timeSinceEpoch = new Date().getTime();
    let experationTime = timeSinceEpoch + Number(config_1.config.token_expire_time) * 1000000;
    let experationTimeInSec = Math.floor(experationTime / 1000);
    try {
        console.log("signJwt-2");
        let token = yield jsonwebtoken_1.default.sign(user, config_1.config.token_secret, {
            algorithm: "HS256",
            expiresIn: experationTimeInSec,
        });
        console.log("signJwt-3");
        return token;
    }
    catch (error) {
        throw Error(error);
        // return
    }
});
exports.signJwt = signJwt;
const refreshToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let timeSinceEpoch = new Date().getTime();
    let experationTime = timeSinceEpoch + Number(config_1.config.token_expire_time) * 1000000;
    let experationTimeInSec = Math.floor(experationTime / 1000);
    try {
        let token = yield jsonwebtoken_1.default.sign(user, config_1.config.token_secret, {
            algorithm: "HS256",
        });
        return token;
    }
    catch (error) {
        throw Error(error);
        // return
    }
});
exports.refreshToken = refreshToken;
