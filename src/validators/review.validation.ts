import {z} from 'zod';

export const createReviewSchema = z.object({
  reviewerId: z.string().optional(),
  employerId: z.string().min(1, 'Employer ID is required'),
  rating: z.number().min(1).max(5),
  comment: z.string().min(1, 'Comment is required'),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
