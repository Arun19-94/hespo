import { Document, Model, model, Types, Schema, Query } from "mongoose";
import { ILogin } from "../interface/Login";  
import { hash } from "bcrypt";

const saltRounds = 8;
const LoginSchema =  new Schema<ILogin>({
    email: {
        type: String,
        required: true,
        unique: true,
      },
    password: {
        type: String,
        required: true,
        unique: true,
      },
    
},{
    timestamps: true,
  })

LoginSchema.pre("save", async function (next) {
    const hashedPassword = await hash(this.password, saltRounds);
    this.password = hashedPassword;
    next();
});

const Login = model<ILogin>("Login", LoginSchema);
export default Login;
