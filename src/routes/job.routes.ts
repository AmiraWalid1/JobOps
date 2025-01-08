import express from 'express';
import { 
    createJob, 
    getAllJobs, 
    getJobById, 
    updateJob, 
    deleteJob 
} from '../controllers/job.controller';

const router = express.Router();

// Route to create a new job
router.post('/', createJob);

// Route to get all jobs
router.get('/', getAllJobs);

// Route to get a specific job by ID
router.get('/:id', getJobById);

// Route to update a job by ID
router.put('/:id', updateJob);

// Route to delete a job by ID
router.delete('/:id', deleteJob);

export default router;
