import mongoose from "mongoose";
import { ILogin } from "./Login";

export interface IUser {

    firstName: string;
    lastName: string;
    email: string,
    gender: any
    timestamps?: boolean;
    _id?: null| any;
    // login?:mongoose.ObjectId|ILogin;
    login?:any;
    token?:string|null
}