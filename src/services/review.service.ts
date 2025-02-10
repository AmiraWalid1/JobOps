import {ReviewModel} from '../models/review.model';
import {UserModel} from '../models/user.model';
import {CustomError} from '../utils/customError';
import {CreateReviewInput} from '../validators/review.validation';

export const createReview = async (reviewData: CreateReviewInput) => {
  const {reviewerId, employerId} = reviewData;

  // Check if reviewer and employer exist
  const [reviewer, employer] = await Promise.all([
    UserModel.findById(reviewerId),
    UserModel.findById(employerId),
  ]);

  if (!reviewer || !employer) throw new CustomError(404, 'User not found');

  const review = await ReviewModel.create(reviewData);
  return review;
};

export const getReviews = async () => {
  const reviews = await ReviewModel.find().populate('reviewerId employerId');
  return reviews;
};

export const getEmployerReviews = async (employerId: string) => {
  const reviews = await ReviewModel.find({employerId: employerId}).populate(
    'reviewerId employerId',
  );
  return reviews;
};

export const updateReview = async (
  reviewId: string,
  updateData: unknown,
  userId: string,
) => {
  const review = await ReviewModel.findById(reviewId).populate(
    'reviewerId employerId',
  );

  if (!review) throw new CustomError(404, 'Review not found');
  if (review.reviewerId._id.toString() !== userId)
    throw new CustomError(403, 'You are not authorized to update this review');

  Object.assign(review, updateData);
  await review.save();
  return review;
};

export const deleteReview = async (reviewId: string, userId: string) => {
  const review = await ReviewModel.findById(reviewId);

  if (!review) throw new CustomError(404, 'Review not found');
  if (review.reviewerId.toString() !== userId)
    throw new CustomError(403, 'You are not authorized to delete this review');

  await ReviewModel.findByIdAndDelete(reviewId);
  return {message: 'Review deleted successfully'};
};
