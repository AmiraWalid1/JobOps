import {NextFunction, Request, Response} from 'express';
import {ZodError} from 'zod';
import {CustomError} from '../utils/customError';
import {sendResponse} from '../utils/response.util';

export const errorHandler = (
  err: Error | ZodError | CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('entered error handler');

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const errors = err.errors.map(e => ({
      field: e.path.join('.'),
      message: e.message,
    }));

    return sendResponse(res, 400, false, 'Validation failed', null, errors);
  }

  // Handle CustomError instances
  if (err instanceof CustomError) {
    return sendResponse(res, err.statusCode, false, err.message, null, []);
  }

  // Handle generic errors
  sendResponse(res, 500, false, 'Internal Server Error', null, []);
};
