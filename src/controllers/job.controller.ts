import {NextFunction, Request, Response} from 'express';
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} from '../services/job.service';
import {sendResponse} from '../utils/response.util';

export const createJobHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {title, description, location, salary} = req.body;
    const employerId = req.user.id; // Assuming the employer is authenticated

    const job = await createJob(
      title,
      description,
      location,
      salary,
      employerId,
    );
    sendResponse(res, 201, true, 'Job created successfully', job);
  } catch (error: unknown) {
    next(error);
  }
};

export const getJobsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const jobs = await getJobs();
    sendResponse(res, 200, true, 'Jobs retrieved successfully', jobs);
  } catch (error: unknown) {
    next(error);
  }
};

export const getJobByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const jobId = req.params.id;
    const job = await getJobById(jobId);
    sendResponse(res, 200, true, 'Job retrieved successfully', job);
  } catch (error: unknown) {
    next(error);
  }
};

export const updateJobHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const jobId = req.params.id;
    const {title, description, location, salary} = req.body;

    const updatedJob = await updateJob(jobId, {
      title,
      description,
      location,
      salary,
    });

    sendResponse(res, 200, true, 'Job updated successfully', updatedJob);
  } catch (error: unknown) {
    next(error);
  }
};

export const deleteJobHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const jobId = req.params.id;
    const result = await deleteJob(jobId);
    sendResponse(res, 200, true, result.message);
  } catch (error: unknown) {
    next(error);
  }
};
