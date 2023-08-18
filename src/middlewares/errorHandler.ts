import { Response } from 'express';
import CustomError from '../errors/customError';
import HttpCode from '../types/httpCode';

class ErrorHandler {
    private isTrustedError(error: Error): boolean {
        if (error instanceof CustomError) return error.isOperational;

        return false;
    }

    private handleTrustedError(error: CustomError, response: Response): void {
        response.status(error.httpCode).json({ message: error.message });
    }

    private handleCriticalError(error: Error | CustomError, response?: Response): void {
        if (response) {
            response.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error', error });
        }

        console.log('Application encountered a critical error. Exiting');
    }

    public handleError(error: Error | CustomError, response?: Response): void {
        if (this.isTrustedError(error) && response) {
            this.handleTrustedError(error as CustomError, response);
        } else {
            this.handleCriticalError(error, response);
        }
    }
}

const errorHandler = new ErrorHandler();

export default errorHandler;