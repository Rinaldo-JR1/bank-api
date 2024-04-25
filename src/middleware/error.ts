import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/httpException';
import logger from '../utils/logger';

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
    const message = error.message || `Error status: 500`;
    const originalError = error.originalError;
    logger.error(`[${request.method}] ${request.url} - ${message} - ${originalError}`);

    response
        .status(500)
        .send({
            message,
            status,
            success: false
        });
}

export default errorMiddleware;
