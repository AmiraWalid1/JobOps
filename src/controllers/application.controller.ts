import {Request, Response, NextFunction} from 'express';
import * as applicationService from '../services/application.service';

// Create a new application
export const createApplication = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const savedApplication = await applicationService.createApplication(req.body);
    res.status(201).json({
      message: 'Application created successfully',
      application: savedApplication,
    });
  } catch (err) {
    next(err);
  }
};

// Get all applications
export const getAllApplications = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const applications = await applicationService.getAllApplications();
    res.status(200).json(applications);
  } catch (err) {
    next(err);
  }
};

// Get a specific application by ID
export const getApplicationById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {id} = req.params;
    const application = await applicationService.getApplicationById(id);
    res.status(200).json(application);
  } catch (err) {
    next(err);
  }
};

// Update an application by ID
export const updateApplicationStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {id} = req.params;
    const updatedApplication = await applicationService.updateApplicationStatus(id, req.body);
    res.status(200).json({
      message: 'Application updated successfully',
      application: updatedApplication,
    });
  } catch (err) {
    next(err);
  }
};

// Delete an application by ID
export const deleteApplication = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {id} = req.params;
    await applicationService.deleteApplication(id);
    res.status(200).json({message: 'Application deleted successfully'});
  } catch (err) {
    next(err);
  }
};

// Get applications by status
export const getApplicationsByStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {status} = req.query;
    const applications = await applicationService.getApplicationsByStatus(status as string);
    res.status(200).json(applications);
  } catch (err) {
    next(err);
  }
};

// Get applications by seeker
export const getApplicationsBySeeker = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {seekerId} = req.params;
    const applications = await applicationService.getApplicationsBySeeker(seekerId);
    res.status(200).json(applications);
  } catch (err) {
    next(err);
  }
};
