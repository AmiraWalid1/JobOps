import {generateToken} from '../utils/generateToken';
import bcrypt from 'bcrypt';
import {NextFunction, Request, Response} from 'express';
import {UserModel} from '../models/user.model';
import {CustomError} from '../utils/customError';

// Register User
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {name, email, password, Rate, Role, phoneNumber} = req.body;

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

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {user},
    });
  } catch (error: unknown) {
    next(error);
  }
};

// Login User
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {email, password} = req.body;

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
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send response with token
    res.status(200).json({success: true, token, data: {user}});
  } catch (error: unknown) {
    next(error);
  }
};
