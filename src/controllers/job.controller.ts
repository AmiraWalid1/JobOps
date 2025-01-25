import {Request, Response, NextFunction} from 'express';
import {JobModel} from '../models/job.model';

// Create a new job
export const createJob = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const newJob = new JobModel(req.body);
    const savedJob = await newJob.save();
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
    const jobs = await JobModel.find();
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
    const job = await JobModel.findById(id);

    if (!job) {
      res.status(404).json({message: 'Job not found'});
      return;
    }

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
    const updatedJob = await JobModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedJob) {
      res.status(404).json({message: 'Job not found'});
      return;
    }

    res
      .status(200)
      .json({message: 'Job updated successfully', job: updatedJob});
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
    const deletedJob = await JobModel.findByIdAndDelete(id);

    if (!deletedJob) {
      res.status(404).json({message: 'Job not found'});
      return;
    }

    res.status(200).json({message: 'Job deleted successfully'});
  } catch (err) {
    next(err);
  }
};
