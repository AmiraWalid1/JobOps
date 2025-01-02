import {generateToken} from '../utils/generateToken';
import bcrypt from 'bcrypt';
import {Request, Response} from 'express';
import {UserModel} from '../models/user.model';

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

    res.status(201).json({success: true, message: 'User created successfully'});
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
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    // Send response with token
    res.status(200).json({success: true, token});
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};
