import {NextFunction, Request, Response} from 'express';
import {getProfile, updateProfile, deleteUser} from '../services/user.service';
import {sendResponse} from '../utils/response.util';

export const getProfileHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user.id;
    const user = await getProfile(userId);
    sendResponse(res, 200, true, 'Profile retrieved successfully', user);
  } catch (error: unknown) {
    next(error);
  }
};

export const updateProfileHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user.id;
    const {name, email, phoneNumber, rate, role} = req.body;

    const updatedUser = await updateProfile(userId, {
      name,
      email,
      phoneNumber,
      role,
      rate,
    });

    sendResponse(res, 200, true, 'Profile updated successfully', updatedUser);
  } catch (error: unknown) {
    next(error);
  }
};

export const deleteUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user.id;
    const result = await deleteUser(userId);
    sendResponse(res, 200, true, result.message);
  } catch (error: unknown) {
    next(error);
  }
};
