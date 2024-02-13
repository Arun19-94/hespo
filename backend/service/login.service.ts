import Login from "../model/login.model";
import { ILogin } from "../interface/Login";
import bcrypt from "bcrypt";

class LoginService {
    constructor(){}
    getUserByEmail =async (email: String):Promise<ILogin|null> => {
        return await Login.findOne(email);
    }
    save =async (login: ILogin) => {
        let _login = new Login(login)
        return await _login.save();
    }

    verifyPassword =async (urlPassword:string, serverPassword: string): Promise<Boolean> => {
        return await bcrypt.compare(urlPassword, serverPassword)
    }
}

export const loginService = new LoginService();

