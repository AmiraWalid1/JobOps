import express from 'express';
import {register, login, getProfile} from '../controllers/user.controller';
import {protect} from '../middlewares/verifyToken';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);

export default router;
