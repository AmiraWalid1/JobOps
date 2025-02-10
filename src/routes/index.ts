import express from 'express';
import userRoutes from './user.routes';
import reviewRoutes from './review.routes';
import jobRoutes from './job.routes';
import applicationRoutes from './application.routes';
import authRoutes from './auth.routes';

const router = express.Router();

// Combine all routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);
router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes);

export default router;
