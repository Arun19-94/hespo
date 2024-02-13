import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";

const errorHandlier = (
    error: HttpException,
    res: Response,
    req: Request,
    next: NextFunction
)=>{
    const status = error.status || 500;
    const errorType = error.errorType || "CUSTOM";
  const message = error.message || 'Something went wrong';
    res.status(status).send({
        message,
        status,
      });
}

export default errorHandlier;