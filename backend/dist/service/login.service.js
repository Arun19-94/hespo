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
exports.loginService = void 0;
const login_model_1 = __importDefault(require("../model/login.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class LoginService {
    constructor() {
        this.getUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            return yield login_model_1.default.findOne(email);
        });
        this.save = (login) => __awaiter(this, void 0, void 0, function* () {
            let _login = new login_model_1.default(login);
            return yield _login.save();
        });
        this.verifyPassword = (urlPassword, serverPassword) => __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.compare(urlPassword, serverPassword);
        });
    }
}
exports.loginService = new LoginService();
