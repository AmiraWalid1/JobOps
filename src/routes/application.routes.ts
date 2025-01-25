import express from 'express';
import {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
  getApplicationsByStatus,
  getApplicationsBySeeker,
} from '../controllers/application.controller';

const router = express.Router();

// Route to create a new application
router.post('/', createApplication);

// Route to get all applications
router.get('/', getAllApplications);

// Route to get applications filtered by status (query parameter)
// GET /api/applications/filter?status=pending
router.get('/filter', getApplicationsByStatus);

// Route to get applications by seeker ID
router.get('/seeker/:seekerId', getApplicationsBySeeker);

// Route to get a specific application by ID
router.get('/:id', getApplicationById);

// Route to update an application by ID
router.put('/:id', updateApplicationStatus);

// Route to delete an application by ID
router.delete('/:id', deleteApplication);

export default router;
