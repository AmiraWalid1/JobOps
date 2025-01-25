import {Request, Response, NextFunction} from 'express';
import {ReviewModel} from '../models/review.model';
import {UserModel} from '../models/user.model';
import {CustomError} from '../utils/customError';
import {
  CreateReviewInput,
  createReviewSchema,
} from '../validators/review.validation';

export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData: CreateReviewInput = createReviewSchema.parse(req.body);
    validatedData.reviewerId = req.user.id;

    // Check if reviewer and employer exist
    const [reviewer, employer] = await Promise.all([
      UserModel.findById(validatedData.reviewerId),
      UserModel.findById(validatedData.employerId),
    ]);

    if (!reviewer || !employer) throw new CustomError(404, 'User not found');

    const review = await ReviewModel.create(validatedData);
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

export const getReviews = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reviews = await ReviewModel.find().populate('reviewerId employerId');
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

export const getEmployerReviews = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reviews = await ReviewModel.find({
      employerId: req.params.employerId,
    }).populate('reviewerId employerId');
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const review = await ReviewModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true},
    ).populate('reviewerId employerId');

    if (!review) throw new CustomError(404, 'Review not found');
    if (review.reviewerId._id.toString() !== req.user.id)
      throw new CustomError(
        403,
        'You are not authorized to update this review',
      );
    // save the updated review
    await review.save();
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const review = await ReviewModel.findByIdAndDelete(req.params.id);
    if (!review) throw new CustomError(404, 'Review not found');
    if (review.reviewerId.toString() !== req.user.id)
      throw new CustomError(
        403,
        'You are not authorized to delete this review',
      );
    res.status(200).json({message: 'Review deleted successfully'});
  } catch (error) {
    next(error);
  }
};
