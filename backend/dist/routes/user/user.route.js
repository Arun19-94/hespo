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
const express_1 = require("express");
const user_service_1 = require("../../service/user.service");
const CustomExceptions_1 = __importDefault(require("../../exceptions/CustomExceptions"));
const login_service_1 = require("../../service/login.service");
const auth_1 = require("../../middleware/auth");
const routerUser = (0, express_1.Router)();
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let users = yield user_service_1.userService.getUserByEmail(req.body.email);
        if (!users || !users._id) {
            let error = new Error("User Not Found Please Register");
            next(new CustomExceptions_1.default(error));
            return;
        }
        if (users.login && users.login.password && (yield login_service_1.loginService.verifyPassword(req.body.password, users.login.password))) {
            let token = yield (0, auth_1.signJwt)(users);
            users.token = token;
            res.status(201).json(users);
        }
        else {
            let error = new Error("Wrong Password");
            let token = yield (0, auth_1.signJwt)(users);
            let _users = JSON.parse(JSON.stringify(users));
            _users.token = token;
            res.status(201).json(_users);
            // next(new CustomException(error))
        }
    }
    catch (error) {
        console.log(error);
        next(new CustomExceptions_1.default(error));
    }
});
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(yield validateRegistration)) {
            let error = new Error("Validation Failed");
            next(new CustomExceptions_1.default(error));
        }
        let users = yield user_service_1.userService.createUser(req.body);
        users = JSON.parse(JSON.stringify(users));
        yield login_service_1.loginService.save(req.body);
        let token = yield (0, auth_1.signJwt)(users);
        users.token = token;
        res.status(201).json(users);
    }
    catch (error) {
        console.log(error);
        next(new CustomExceptions_1.default(error));
    }
});
const validateRegistration = () => __awaiter(void 0, void 0, void 0, function* () {
    return true;
});
routerUser.post('/api/user/login', login);
routerUser.post('/api/user/register', register);
exports.default = routerUser;
