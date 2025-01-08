import express from 'express';
import {
  getProfile,
  deleteUser,
  updateProfile,
} from '../controllers/user.controller';
import {login, register} from '../controllers/auth.controller';
import {protect} from '../middlewares/verifyToken';
import {validate} from '../middlewares/validation.middleware';
import {
  userSchema,
  updateUserSchema,
  loginSchema,
} from '../validators/user.validator';

const router = express.Router();

router.post('/register', validate(userSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, validate(updateUserSchema), updateProfile);
router.delete('/profile', protect, deleteUser);

export default router;
