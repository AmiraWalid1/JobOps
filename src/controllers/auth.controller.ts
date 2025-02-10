import {NextFunction, Request, Response} from 'express';
import {register, login} from '../services/auth.service';
import {sendResponse} from '../utils/response.util';

export const registerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {name, email, password, Rate, Role, phoneNumber} = req.body;

    const {user} = await register(
      name,
      email,
      password,
      Rate,
      Role,
      phoneNumber,
    );

    sendResponse(res, 201, true, 'User created successfully', {user});
  } catch (error: unknown) {
    next(error);
  }
};

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {email, password} = req.body;

    const {user, token} = await login(email, password);

    // Set token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    sendResponse(res, 200, true, 'Login successful', {user, token});
  } catch (error: unknown) {
    next(error);
  }
};
