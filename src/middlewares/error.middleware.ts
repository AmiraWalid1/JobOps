import {Request, Response, NextFunction} from 'express';

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
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('entered error handler');
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong!';
  const errors = err.errors || [];

  res.status(statusCode).json({
    status: defaultMessages[statusCode],
    message,
    errors,
  });
};
