import {Request, Response, NextFunction} from 'express';
import {
  createReview,
  getReviews,
  getEmployerReviews,
  updateReview,
  deleteReview,
} from '../services/review.service';
import {
  CreateReviewInput,
  createReviewSchema,
} from '../validators/review.validation';
import {sendResponse} from '../utils/response.util';

export const createReviewHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData: CreateReviewInput = createReviewSchema.parse(req.body);
    validatedData.reviewerId = req.user.id;

    const review = await createReview(validatedData);
    sendResponse(res, 201, true, 'Review created successfully', review);
  } catch (error) {
    next(error);
  }
};

export const getReviewsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reviews = await getReviews();
    sendResponse(res, 200, true, 'Reviews retrieved successfully', reviews);
  } catch (error) {
    next(error);
  }
};

export const getEmployerReviewsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reviews = await getEmployerReviews(req.params.employerId);
    sendResponse(
      res,
      200,
      true,
      'Employer reviews retrieved successfully',
      reviews,
    );
  } catch (error) {
    next(error);
  }
};

export const updateReviewHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const review = await updateReview(req.params.id, req.body, req.user.id);
    sendResponse(res, 200, true, 'Review updated successfully', review);
  } catch (error) {
    next(error);
  }
};

export const deleteReviewHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await deleteReview(req.params.id, req.user.id);
    sendResponse(res, 200, true, result.message);
  } catch (error) {
    next(error);
  }
};
