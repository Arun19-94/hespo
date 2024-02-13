import mongoose from "mongoose";

export interface ILogin {
    _id?: mongoose.ObjectId,
    email: string,
    password: string,
}