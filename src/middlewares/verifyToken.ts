import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {UserModel} from '../models/user.model'; // Ensure correct import for UserModel

// Middleware to verify JWT and attach the user to req.user
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token: string | undefined;

  // Check for token in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res
      .status(401)
      .json({success: false, message: 'No token, authorization denied'});
    return;
  }

  try {
    // Verify the token using secret key
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as jwt.JwtPayload;

    // Find user by decoded id (this assumes the payload contains user id)
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      res.status(404).json({success: false, message: 'User not found'});
      return;
    }

    // Attach the user to the request object
    req.user = {
      id: user.id.toString(),
    };

    // Proceed to the next middleware/route handler
    return next();
  } catch (error) {
    res.status(401).json({success: false, message: 'Token is not valid'});
  }
};
