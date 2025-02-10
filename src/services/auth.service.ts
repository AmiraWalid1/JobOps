import bcrypt from 'bcrypt';
import {UserModel} from '../models/user.model';
import {CustomError} from '../utils/customError';
import {generateToken} from '../utils/generateToken';

export const register = async (
  name: string,
  email: string,
  password: string,
  Rate: number,
  Role: string,
  phoneNumber: string,
) => {
  // Check if the email is already in use
  const existingUser = await UserModel.findOne({email}).select('-password');
  if (existingUser) {
    throw new CustomError(400, 'User with this email already exists');
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = new UserModel({
    name,
    email,
    password: hashedPassword,
    Rate,
    Role,
    phoneNumber,
  });

  // Save to DB
  await user.save();

  return {user};
};

export const login = async (email: string, password: string) => {
  // Find user by email
  const user = await UserModel.findOne({email});
  if (!user) {
    throw new CustomError(400, 'Invalid credentials');
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new CustomError(400, 'Invalid credentials');
  }

  // Generate JWT Token
  const token = generateToken(user._id.toString());

  return {user, token};
};
