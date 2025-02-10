import express from 'express';
import {
  createApplicationHandler,
  getAllApplicationsHandler,
  getApplicationByIdHandler,
  updateApplicationStatusHandler,
  deleteApplicationHandler,
  getApplicationsByStatusHandler,
  getApplicationsBySeekerHandler,
} from '../controllers/application.controller';
import {validate} from '../middlewares/validation.middleware';
import {
  createApplicationSchema,
  updateApplicationSchema,
  getApplicationsByStatusSchema,
} from '../validators/application.validator';
import {protect} from '../middlewares/verifyToken';

const router = express.Router();

// Route to create a new application
router.post(
  '/',
  protect,
  validate(createApplicationSchema, 'body'),
  createApplicationHandler,
);

// Route to get all applications
router.get('/', getAllApplicationsHandler);

// Route to get applications filtered by status (query parameter)
// GET /api/applications/filter?status=pending
router.get(
  '/filter',
  validate(getApplicationsByStatusSchema, 'query'),
  getApplicationsByStatusHandler,
);

// Route to get applications by seeker ID
router.get('/seeker/:seekerId', getApplicationsBySeekerHandler);

// Route to get a specific application by ID
router.get('/:id', protect, getApplicationByIdHandler);

// Route to update an application by ID
router.put(
  '/:id',
  protect,
  validate(updateApplicationSchema, 'body'),
  updateApplicationStatusHandler,
);

// Route to delete an application by ID
router.delete('/:id', protect, deleteApplicationHandler);

export default router;
