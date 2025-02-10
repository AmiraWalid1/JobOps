import express from 'express';
import {
  getProfileHandler,
  deleteUserHandler,
  updateProfileHandler,
} from '../controllers/user.controller';
import {loginHandler, registerHandler} from '../controllers/auth.controller';
import {protect} from '../middlewares/verifyToken';
import {validate} from '../middlewares/validation.middleware';
import {
  userSchema,
  updateUserSchema,
  loginSchema,
} from '../validators/user.validator';

const router = express.Router();

router.post('/register', validate(userSchema, 'body'), registerHandler);
router.post('/login', validate(loginSchema, 'body'), loginHandler);
router.get('/profile', protect, getProfileHandler);
router.put(
  '/profile',
  protect,
  validate(updateUserSchema, 'body'),
  updateProfileHandler,
);
router.delete('/profile', protect, deleteUserHandler);

export default router;
