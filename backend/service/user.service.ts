import mongoose from "mongoose";
import User from "../model/user.model";
import { IUser } from "../interface/User";


class UserService {
    constructor(){}
    getAllUser =async () => {
        return await User.find();
    }

    getUserById =async (id: mongoose.Types.ObjectId) => {
        return await User.findById(id);
    }

    getUserByEmail =async (email: String) : Promise<null | IUser>=> {
        return await User.findOne({email:email}).populate("login");
    }

    

    getAnyUser =async () => {
        let user = await User.findOne({email: "ABC@gmail.com"});
        return user
    }

    createUser =async (user:IUser) => {
        try {
            let _user = new User(user)
            return await _user.save();
        } catch (error) {
            throw (error)            
        }
    }
}
export const userService : UserService = new UserService();