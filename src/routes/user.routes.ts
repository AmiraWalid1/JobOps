import express from 'express';
import {
  getProfileHandler,
  deleteUserHandler,
  updateProfileHandler,
} from '../controllers/user.controller';
import {protect} from '../middlewares/verifyToken';
import {validate} from '../middlewares/validation.middleware';
import {updateUserSchema} from '../validators/user.validator';

const router = express.Router();

router.get('/profile', protect, getProfileHandler);
router.put(
  '/profile',
  protect,
  validate(updateUserSchema, 'body'),
  updateProfileHandler,
);
router.delete('/profile', protect, deleteUserHandler);

export default router;
