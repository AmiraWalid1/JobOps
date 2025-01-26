import express from 'express';
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} from '../controllers/job.controller';
import { protect } from '../middlewares/verifyToken';
import { validate } from '../middlewares/validation.middleware';
import { createJobSchema, updateJobSchema } from '../validators/job.validator';


const router = express.Router();

// Route to create a new job
router.post('/', protect, validate(createJobSchema, 'body'), createJob);

// Route to get all jobs
router.get('/', getAllJobs);

// Route to get a specific job by ID
router.get('/:id', getJobById);

// Route to update a job by ID
router.put('/:id', protect, validate(updateJobSchema, 'body'), updateJob);

// Route to delete a job by ID
router.delete('/:id', protect, deleteJob);

export default router;
