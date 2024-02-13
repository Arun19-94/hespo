import mongoose, { Document, Model, model, Types, Schema, Query } from "mongoose";
import { IUser } from "../interface/User";
import Login from "./login.model";
import { hash } from "bcrypt";

const UserSchema = new Schema<IUser>(
  {
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
      ref: Login,
      type: Schema.Types.ObjectId,
    }
  },
  {
    timestamps: true,
  }
);

interface UserBaseDocument extends IUser, Document {
  fullName: string;
  getGender(): string;
}

UserSchema.methods.getGender = function (this: UserBaseDocument) {
  return this.gender > 0 ? "Male" : "Female";
};

UserSchema.virtual("fullName").get(function (this: UserBaseDocument) {
  return this.firstName + this.lastName;
});

const User = model<IUser>("User", UserSchema);
export default User;
