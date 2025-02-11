import {generateToken} from '../utils/generateToken';
import {User} from '../validators/user.validator';
import {UserModel} from '../models/user.model';
import {CustomError} from '../utils/customError';
import bcrypt from 'bcrypt';

export const register = async (userData: User) => {
  const {name, email, password, phoneNumber, rate, role} = userData;

  // Check if the email is already in use
  const existingUser = await UserModel.findOne({email});
  if (existingUser) {
    throw new CustomError(400, 'User with this email already exists');
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = new UserModel({
    name,
    email,
    password: hashedPassword,
    phoneNumber: phoneNumber,
    role: role || 'seeker',
    rate: rate || 0,
  });

  // Save to the database
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
