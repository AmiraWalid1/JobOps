import express from 'express';
import {
  createReview,
  getReviews,
  getEmployerReviews,
  updateReview,
  deleteReview,
} from '../controllers/review.controller';
import {protect} from '../middlewares/verifyToken';
import {validate} from '../middlewares/validation.middleware';
import {createReviewSchema} from '../validators/review.validation';

const router = express.Router();

router.post('/', protect, validate(createReviewSchema, "body"), createReview);
router.get('/', getReviews);
router.get('/employer/:employerId', getEmployerReviews);
router.put(
  '/:id',
  protect,
  validate(createReviewSchema.partial(), "body"),
  updateReview,
);
router.delete('/:id', protect, deleteReview);

export default router;
