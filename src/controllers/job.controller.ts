import {Request, Response, NextFunction} from 'express';
import * as jobService from '../services/job.service';

// Create a new job
export const createJob = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const savedJob = await jobService.createJob(req.body);
    res.status(201).json({
      message: 'Job created successfully',
      job: savedJob,
    });
  } catch (err) {
    next(err);
  }
};

// Get all jobs
export const getAllJobs = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const jobs = await jobService.getAllJobs();
    res.status(200).json(jobs);
  } catch (err) {
    next(err);
  }
};

// Get a job by ID
export const getJobById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {id} = req.params;
    const job = await jobService.getJobById(id);
    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

// Update a job by ID
export const updateJob = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {id} = req.params;
    const updatedJob = await jobService.updateJob(id, req.body);
    res.status(200).json({
      message: 'Job updated successfully',
      job: updatedJob,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a job by ID
export const deleteJob = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {id} = req.params;
    await jobService.deleteJob(id);
    res.status(200).json({message: 'Job deleted successfully'});
  } catch (err) {
    next(err);
  }
};
