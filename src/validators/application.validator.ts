import { z } from 'zod';

// Define validation schemas
export const createApplicationSchema = z.object({
    seekerId: z.string().nonempty('Seeker ID is required'),
    jobId: z.string().nonempty('Job ID is required'),
    cv: z.string().nonempty('CV is required'),
    status: z.string().optional().default('pending'),
});

export const updateApplicationSchema = z.object({
    cv: z.string().nonempty('CV is required'),
    status: z.string().optional(),
});

export const getApplicationsByStatusSchema = z.object({
    status: z.string().nonempty('Status is required'),
});

export type createSchema = z.infer<typeof createApplicationSchema>;
export type updateSchema = z.infer<typeof updateApplicationSchema>;
export type getByStatusSchema = z.infer<typeof getApplicationsByStatusSchema>;