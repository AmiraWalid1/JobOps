import {Request, Response, NextFunction} from 'express';
import {ApplicationModel} from '../models/application.model';

// Create a new application
export const createApplication = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {seekerId, jobId, cv, status} = req.body;

    // Validate required fields
    if (!seekerId || !jobId || !cv) {
      res.status(400).json({message: 'Missing required fields'});
      return;
    }

    // Create and save the application
    const newApplication = new ApplicationModel({
      seekerId,
      jobId,
      cv,
      status: status || 'pending', // Default status to "pending"
    });

    const savedApplication = await newApplication.save();
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
    const applications = await ApplicationModel.find();
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
    const application = await ApplicationModel.findById(id);

    if (!application) {
      res.status(404).json({message: 'Application not found'});
      return;
    }

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
    const updatedApplication = await ApplicationModel.findByIdAndUpdate(
      id,
      req.body,
      {new: true},
    );

    if (!updatedApplication) {
      res.status(404).json({message: 'Application not found'});
      return;
    }

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
    const deletedApplication = await ApplicationModel.findByIdAndDelete(id);

    if (!deletedApplication) {
      res.status(404).json({message: 'Application not found'});
      return;
    }

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

    if (!status) {
      res.status(400).json({message: 'Status query parameter is required'});
      return;
    }

    const applications = await ApplicationModel.find({status});
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

    const applications = await ApplicationModel.find({seekerId});
    res.status(200).json(applications);
  } catch (err) {
    next(err);
  }
};
