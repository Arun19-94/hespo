"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const login_model_1 = __importDefault(require("./login.model"));
const UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    lastName: String,
    gender: {
        type: Number,
        min: 0,
        max: 1,
    },
    login: {
        ref: login_model_1.default,
        type: mongoose_1.Schema.Types.ObjectId,
    }
}, {
    timestamps: true,
});
UserSchema.methods.getGender = function () {
    return this.gender > 0 ? "Male" : "Female";
};
UserSchema.virtual("fullName").get(function () {
    return this.firstName + this.lastName;
});
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
