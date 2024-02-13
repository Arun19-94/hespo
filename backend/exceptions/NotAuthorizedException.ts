import HttpException from './HttpException';

class NotAuthorizedException extends HttpException {
  constructor() {
    super(403, "You're not authorized", "NotAuthorizedException");
  }
}

export default NotAuthorizedException;