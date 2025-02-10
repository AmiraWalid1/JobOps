import {Request, Response, NextFunction} from 'express';
import {sendResponse} from '../utils/response.util';

interface CustomError extends Error {
  statusCode?: number;
  errors?: unknown[];
}

const defaultMessages: {[key: number]: string} = {
  400: 'Bad Request',
  401: 'Unauthorized',
  404: 'Not Found',
  500: 'Internal Server Error',
};

// Error Handler Middleware
export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.log('entered error handler');
  const statusCode = err.statusCode || 500;
  const message =
    err.message || defaultMessages[statusCode] || 'Something went wrong!';
  const errors = err.errors || [];

  sendResponse(res, statusCode, false, message, null, errors);
};
