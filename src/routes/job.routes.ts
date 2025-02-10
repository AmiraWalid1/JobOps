import express from 'express';
import {
  createJobHandler,
  getJobsHandler,
  getJobByIdHandler,
  updateJobHandler,
  deleteJobHandler,
} from '../controllers/job.controller';
import {protect} from '../middlewares/verifyToken';
import {validate} from '../middlewares/validation.middleware';
import {createJobSchema, updateJobSchema} from '../validators/job.validator';

const router = express.Router();

// Route to create a new job
router.post('/', protect, validate(createJobSchema, 'body'), createJobHandler);

// Route to get all jobs
router.get('/', getJobsHandler);

// Route to get a specific job by ID
router.get('/:id', getJobByIdHandler);

// Route to update a job by ID
router.put(
  '/:id',
  protect,
  validate(updateJobSchema, 'body'),
  updateJobHandler,
);

// Route to delete a job by ID
router.delete('/:id', protect, deleteJobHandler);

export default router;
