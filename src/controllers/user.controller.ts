import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {UserModel} from '../models/user.model'; // Ensure correct import path for UserModel

// Function to generate JWT token
const generateToken = (userId: string): string => {
  return jwt.sign({id: userId}, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  }); // adjust the expiry as needed
};

// Register User
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const {name, email, password, Rate, Role, phoneNumber} = req.body;

    // Input Validation
    if (!name || !email || !password) {
      res
        .status(400)
        .json({success: false, message: 'Please provide all required fields'});
      return;
    }

    // Check if the email is already in use
    const existingUser = await UserModel.findOne({email});
    if (existingUser) {
      res.status(400).json({success: false, message: 'Email already in use'});
      return;
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

    // Generate token
    const token = generateToken(user._id.toString());

    res.status(201).json({success: true, data: {user, token}});
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

// Login User
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const {email, password} = req.body;

    // Validate input
    if (!email || !password) {
      res
        .status(400)
        .json({success: false, message: 'Email and password are required'});
      return;
    }

    // Find user by email
    const user = await UserModel.findOne({email});
    if (!user) {
      res.status(404).json({success: false, message: 'User not found'});
      return;
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({success: false, message: 'Invalid credentials'});
      return;
    }

    // Generate JWT Token
    const token = generateToken(user._id.toString());

    // Send response with token
    res.status(200).json({success: true, token});
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

// Get Profile (Authenticated User)
export const getProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user._id; // Assuming this is set by middleware during authentication

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
