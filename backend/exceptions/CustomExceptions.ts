import HttpException from './HttpException';

class CustomException extends HttpException {
  constructor(err: Error) {
    super(400,err.toString() , "CustomException");
  }
}

export default CustomException;