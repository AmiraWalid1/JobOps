import {Response} from 'express';

type ResponseData = {
  success: boolean;
  message?: string;
  data?: unknown;
  errors?: unknown[];
};

export const sendResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  message?: string,
  data?: unknown,
  errors?: unknown[],
) => {
  const response: ResponseData = {success};
  if (message) response.message = message;
  if (data) response.data = data;
  if (errors) response.errors = errors;

  res.status(statusCode).json(response);
};
