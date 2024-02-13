import { userService } from "../service/user.service";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";
import { config } from "../config/config";
import { IUser } from "../interface/User";

export const extractJwt = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];
    if (token) {
      let decode = await jwt.verify(token, config.token_secret);
      res.locals.user = decode;
      next();
    } else {
      return res.status(401).json({
        msg: "Unauthorised",
      });
    }
  } catch (error) {
    res.status(404).json({
      msg: error.message,
      error,
    });
  }
};

export const signJwt = async (_user: IUser) => {
  console.log("signJwt-1")
  console.log(_user)
  let user = JSON.parse(JSON.stringify(_user))
  let timeSinceEpoch = new Date().getTime();
  let experationTime =
    timeSinceEpoch + Number(config.token_expire_time) * 1000000;
  let experationTimeInSec = Math.floor(experationTime / 1000);
  try {
    console.log("signJwt-2")
    let token = await jwt.sign(user, config.token_secret, {
      algorithm: "HS256",
      expiresIn: experationTimeInSec,
    });
    console.log("signJwt-3")
    return token;
  } catch (error) {
    throw Error(error);
    // return
  }
};

export const refreshToken = async (user: IUser) => {
    let timeSinceEpoch = new Date().getTime();
    let experationTime =
      timeSinceEpoch + Number(config.token_expire_time) * 1000000;
    let experationTimeInSec = Math.floor(experationTime / 1000);
    try {
      let token = await jwt.sign(user, config.token_secret, {
        algorithm: "HS256",
      });
      return token;
    } catch (error) {
      throw Error(error);
      // return
    }
  };


