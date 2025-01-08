import {NextFunction, Request, Response} from 'express';
import {UserModel} from '../models/user.model';
import {CustomError} from '../utils/customError';

// getProfile (Authenticated User)
export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user.id;
    // Find user by ID
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new CustomError(404, 'User not found');
    }

    // Respond with user data
    res.status(200).json({success: true, data: user});
  } catch (error: unknown) {
    next(error);
  }
};

// Update Profile (Authenticated User)
export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user.id;
    const {name, email, Rate, Role, phoneNumber} = req.body;

    // Find user by ID
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new CustomError(404, 'User not found');
    }

    // Update user data
    user.name = name || user.name;
    user.email = email || user.email;
    user.Rate = Rate || user.Rate;
    user.Role = Role || user.Role;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    // Save updated user data
    await user.save();

    // Respond with updated user data
    res.status(200).json({success: true, data: user});
  } catch (error: unknown) {
    next(error);
  }
};

// Delete User (Authenticated User)
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user.id;
    // Find user by ID and delete
    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) {
      throw new CustomError(404, 'User not found');
    }

    // Respond with success message
    res.status(200).json({success: true, message: 'User deleted successfully'});
  } catch (error: unknown) {
    next(error);
  }
};
