import express from 'express';
import {
  getProfile,
  deleteUser,
  updateProfile,
} from '../controllers/user.controller';
import {login, register} from '../controllers/auth.controller';
import {protect} from '../middlewares/verifyToken';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.delete('/profile', protect, deleteUser);

export default router;
