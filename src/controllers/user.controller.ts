import {Request, Response} from 'express';
import {UserModel} from '../models/user.model';

// getProfile (Authenticated User)
export const getProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user.id;
    // Find user by ID
    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({success: false, message: 'User not found'});
      return;
    }

    // Respond with user data
    res.status(200).json({success: true, data: user});
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal server error';
    res.status(500).json({success: false, message: errorMessage});
  }
};

// Update Profile (Authenticated User)
export const updateProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user.id;
    const {name, email, Rate, Role, phoneNumber} = req.body;

    // Find user by ID
    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({success: false, message: 'User not found'});
      return;
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
    const errorMessage =
      error instanceof Error ? error.message : 'Internal server error';
    res.status(500).json({success: false, message: errorMessage});
  }
};

// Delete User (Authenticated User)
export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user.id;
    // Find user by ID and delete
    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).json({success: false, message: 'User not found'});
      return;
    }

    // Respond with success message
    res.status(200).json({success: true, message: 'User deleted successfully'});
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal server error';
    res.status(500).json({success: false, message: errorMessage});
  }
};
