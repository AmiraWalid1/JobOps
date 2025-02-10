import express from 'express';
import {
  createReviewHandler,
  getReviewsHandler,
  getEmployerReviewsHandler,
  updateReviewHandler,
  deleteReviewHandler,
} from '../controllers/review.controller';
import {protect} from '../middlewares/verifyToken';
import {validate} from '../middlewares/validation.middleware';
import {createReviewSchema} from '../validators/review.validation';

const router = express.Router();

router.post(
  '/',
  protect,
  validate(createReviewSchema, 'body'),
  createReviewHandler,
);
router.get('/', getReviewsHandler);
router.get('/employer/:employerId', getEmployerReviewsHandler);
router.put(
  '/:id',
  protect,
  validate(createReviewSchema.partial(), 'body'),
  updateReviewHandler,
);
router.delete('/:id', protect, deleteReviewHandler);

export default router;
