export class ErrorApi extends Error {
    public statusCode: number;
    public errors: { message: string }
    constructor( message: string,statusCode: number, ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = { message };
    }
}