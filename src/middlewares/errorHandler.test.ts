import { describe, expect, it, vi } from 'vitest';
import CustomError from '../errors/customError';
import HttpCode from '../types/httpCode';
import errorHandler from './errorHandler';

describe('Handlind server errors', () => {

    describe('Handling trusted errors', () => {
        
        it('Should be able to handle a bad request error', () => {
            const responseMock = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            };
            const errorArgs = {
                name: 'Bad request error',
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Description of a bad request error',
                isOperational: true,
            };
            const trustedError = new CustomError(errorArgs);

            errorHandler.handleError(trustedError, responseMock as any);

            expect(responseMock.status).toHaveBeenCalledWith(HttpCode.BAD_REQUEST);
            expect(responseMock.json).toHaveBeenCalledWith({ message: 'Description of a bad request error' });
        });

        it('Should be able to handle an unauthorized error', () => {
            const responseMock = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            };
            const errorArgs = {
                name: 'Unauthorized error',
                httpCode: HttpCode.UNAUTHORIZED,
                description: 'Description of an unauthorized error',
                isOperational: true,
            };
            const trustedError = new CustomError(errorArgs);

            errorHandler.handleError(trustedError, responseMock as any);

            expect(responseMock.status).toHaveBeenCalledWith(HttpCode.UNAUTHORIZED);
            expect(responseMock.json).toHaveBeenCalledWith({ message: 'Description of an unauthorized error' });
        });

        it('Should be able to handle a forbidden error', () => {
            const responseMock = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            };
            const errorArgs = {
                name: 'Forbidden error',
                httpCode: HttpCode.FORBIDDEN,
                description: 'Description of a forbidden error',
                isOperational: true,
            };
            const trustedError = new CustomError(errorArgs);

            errorHandler.handleError(trustedError, responseMock as any);

            expect(responseMock.status).toHaveBeenCalledWith(HttpCode.FORBIDDEN);
            expect(responseMock.json).toHaveBeenCalledWith({ message: 'Description of a forbidden error' });
        });

        it('Should be able to handle a not found error', () => {
            const responseMock = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            };
            const errorArgs = {
                name: 'Not found error',
                httpCode: HttpCode.NOT_FOUND,
                description: 'Description of a not found error',
                isOperational: true,
            };
            const trustedError = new CustomError(errorArgs);

            errorHandler.handleError(trustedError, responseMock as any);

            expect(responseMock.status).toHaveBeenCalledWith(HttpCode.NOT_FOUND);
            expect(responseMock.json).toHaveBeenCalledWith({ message: 'Description of a not found error' });
        });

        it('Should be able to handle a conflict error', () => {
            const responseMock = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            };
            const errorArgs = {
                name: 'Conflict error',
                httpCode: HttpCode.CONFLICT,
                description: 'Description of a conflict error',
                isOperational: true,
            };
            const trustedError = new CustomError(errorArgs);

            errorHandler.handleError(trustedError, responseMock as any);

            expect(responseMock.status).toHaveBeenCalledWith(HttpCode.CONFLICT);
            expect(responseMock.json).toHaveBeenCalledWith({ message: 'Description of a conflict error' });
        });

        it('Should be able to handle an unprocessable entity error', () => {
            const responseMock = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            };
            const errorArgs = {
                name: 'Unprocessable entity error',
                httpCode: HttpCode.UNPROCESSABLE_ENTITY,
                description: 'Description of an unprocessable entity error',
                isOperational: true,
            };
            const trustedError = new CustomError(errorArgs);

            errorHandler.handleError(trustedError, responseMock as any);

            expect(responseMock.status).toHaveBeenCalledWith(HttpCode.UNPROCESSABLE_ENTITY);
            expect(responseMock.json).toHaveBeenCalledWith({ message: 'Description of an unprocessable entity error' });
        });

        it('Should be able to handle an error without sending the "name" parameter', () => {
            const responseMock = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            };
            const errorArgs = {
                httpCode: HttpCode.NOT_FOUND,
                description: 'Description of an error',
                isOperational: true,
            };
            const trustedError = new CustomError(errorArgs);

            errorHandler.handleError(trustedError, responseMock as any);

            expect(responseMock.status).toHaveBeenCalledWith(HttpCode.NOT_FOUND);
            expect(responseMock.json).toHaveBeenCalledWith({ message: 'Description of an error' });
        });

        it('Should be able to handle an error without sending the "isOperational" parameter', () => {
            const responseMock = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            };
            const errorArgs = {
                name: 'Trusted error',
                httpCode: HttpCode.NOT_FOUND,
                description: 'Description of an error',
            };
            const trustedError = new CustomError(errorArgs);

            errorHandler.handleError(trustedError, responseMock as any);

            expect(responseMock.status).toHaveBeenCalledWith(HttpCode.NOT_FOUND);
            expect(responseMock.json).toHaveBeenCalledWith({ message: 'Description of an error' });
        });
    });

    describe('Handling untrusted errors', () => {

        it('Should handle a internal server error', () => {
            const responseMock = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            };
            const untrustedError = new Error('Internal server error');

            errorHandler.handleError(untrustedError, responseMock as any);

            expect(responseMock.status).toHaveBeenCalledWith(HttpCode.INTERNAL_SERVER_ERROR);
            expect(responseMock.json).toHaveBeenCalledWith({ message: 'Internal server error', error: untrustedError });
        });
    });
});
