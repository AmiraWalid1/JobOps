import { z } from 'zod';

// Define the validation schema for job creation
export const createJobSchema = z.object({
  title: z.string().nonempty('Job title is required'),
  description: z.string().nonempty('Job description is required'),
  company: z.string().nonempty('Company name is required'),
  location: z.string().optional(),
  salary: z.number().optional(),
});

// Define the validation schema for updating a job
export const updateJobSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  company: z.string().optional(),
  location: z.string().optional(),
  salary: z.number().optional(),
});

export type CreateJob = z.infer<typeof createJobSchema>;
export type UpdateJob = z.infer<typeof updateJobSchema>;