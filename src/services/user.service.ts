import {UserModel} from '../models/user.model';
import {CustomError} from '../utils/customError';

export const getProfile = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new CustomError(404, 'User not found');
  return user;
};

export const updateProfile = async (
  userId: string,
  updateData: {
    name?: string;
    email?: string;
    Rate?: number;
    Role?: string;
    phoneNumber?: string;
  },
) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new CustomError(404, 'User not found');

  // Update user data
  user.name = updateData.name || user.name;
  user.email = updateData.email || user.email;
  user.Rate = updateData.Rate || user.Rate;
  user.Role = updateData.Role || user.Role;
  user.phoneNumber = updateData.phoneNumber || user.phoneNumber;

  await user.save();
  return user;
};

export const deleteUser = async (userId: string) => {
  const user = await UserModel.findByIdAndDelete(userId);
  if (!user) throw new CustomError(404, 'User not found');
  return {message: 'User deleted successfully'};
};
