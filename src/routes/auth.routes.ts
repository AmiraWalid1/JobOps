import express from 'express';
import {loginHandler, registerHandler} from '../controllers/auth.controller';
import {validate} from '../middlewares/validation.middleware';
import {loginSchema, userSchema} from '../validators/user.validator';

const router = express.Router();

router.post('/register', validate(userSchema, 'body'), registerHandler);
router.post('/login', validate(loginSchema, 'body'), loginHandler);

export default router;
