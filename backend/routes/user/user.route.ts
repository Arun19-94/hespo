import { NextFunction, Request, Response, Router } from 'express';
import { userService } from '../../service/user.service';
import { IUser } from '../../interface/User';
import CustomException from '../../exceptions/CustomExceptions';
import { ILogin } from '../../interface/Login';
import { loginService } from '../../service/login.service';
import { signJwt } from '../../middleware/auth';

const routerUser: Router = Router();

const login = async(req: Request, res: Response, next: NextFunction) => {
    try {
        let users: null |IUser = await userService.getUserByEmail(req.body.email)
        if (!users || !users._id) {
            let error =  new Error("User Not Found Please Register");
            next(new CustomException(error))
            return
        }
        if (users.login && users.login.password && await loginService.verifyPassword(req.body.password, users.login.password)) {
            let token:string = await signJwt(users);
            users.token = token
            res.status(201).json(users);
        } else {
            let error =  new Error("Wrong Password");
            let token:string = await signJwt(users);
            let _users: IUser = JSON.parse(JSON.stringify(users))
            _users.token = token
            res.status(201).json(_users);
            // next(new CustomException(error))
        }
        
    } catch (error) {
        console.log(error)
        next(new CustomException(error)) 
    }
}

const register = async(req: Request, res: Response, next: NextFunction) => {
    try {
        if (! await validateRegistration) {
            let error =  new Error("Validation Failed");
            next(new CustomException(error))
        }
        let users:IUser = await userService.createUser(req.body)
        users = JSON.parse(JSON.stringify(users))
        await loginService.save(req.body)
        let token:string = await signJwt(users);
        users.token = token
        res.status(201).json(users);
    } catch (error) {
        console.log(error)
        next(new CustomException(error))
    }
}
const validateRegistration = async(): Promise<boolean>=>{
    return true
}

routerUser.post('/api/user/login', login)
routerUser.post('/api/user/register', register)

export default routerUser; 