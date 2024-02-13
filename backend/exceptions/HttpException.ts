class HttpException extends Error {
    public status: number;
    public message: string;
    public errorType: string;
    constructor(status: number, message: string, errorType:string) {
      super(message);
      this.status = status;
      this.message = message;
      this.errorType = errorType;
    }
  }
  
  export default HttpException;