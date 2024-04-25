class HttpException extends Error {
    public status: number;
    public message: string;
    public originalError: any;

    constructor(status: number, message: string, error?: any) {
        super(message);
        this.status = status;
        this.message = message;
        this.originalError = error;
    }
}

export default HttpException;