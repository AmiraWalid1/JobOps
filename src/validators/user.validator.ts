import {z} from 'zod';

export const userSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8).max(255),
  rate: z.number().optional(),
  role: z.enum(['seeker', 'employer']).optional(),
  phoneNumber: z.string(),
});

export const updateUserSchema = z.object({
  name: z.string().min(3).max(255).optional(),
  email: z.string().email().optional(),
  rate: z.number().optional(),
  role: z.enum(['seeker', 'employer']).optional(),
  phoneNumber: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

export type User = z.infer<typeof userSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type Login = z.infer<typeof loginSchema>;
