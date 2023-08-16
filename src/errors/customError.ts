import HttpCode from '../types/httpCode';

interface IServerErrorArgs {
    name?: string;
    httpCode: HttpCode;
    description: string;
    isOperational?: boolean;
}

class CustomError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpCode;
    public readonly isOperational: boolean = true;

    constructor(args: IServerErrorArgs) {
        super(args.description);

        Object.setPrototypeOf(this, new.target.prototype);

        this.name = args.name ?? 'Error';
        this.httpCode = args.httpCode;

        if (args.isOperational !== undefined) {
            this.isOperational = args.isOperational;
        }

        Error.captureStackTrace(this);
    }
}

export default CustomError;
