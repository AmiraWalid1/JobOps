import {NextFunction, Request, Response} from 'express';
import {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
  getApplicationsByStatus,
  getApplicationsBySeeker,
} from '../services/application.service';
import {sendResponse} from '../utils/response.util';

export const createApplicationHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {seekerId, jobId, cv, status} = req.body;

    const application = await createApplication({seekerId, jobId, cv, status});
    sendResponse(
      res,
      201,
      true,
      'Application created successfully',
      application,
    );
  } catch (error: unknown) {
    next(error);
  }
};

export const getAllApplicationsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const applications = await getAllApplications();
    sendResponse(
      res,
      200,
      true,
      'Applications retrieved successfully',
      applications,
    );
  } catch (error: unknown) {
    next(error);
  }
};

export const getApplicationByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const applicationId = req.params.id;
    const application = await getApplicationById(applicationId);
    sendResponse(
      res,
      200,
      true,
      'Application retrieved successfully',
      application,
    );
  } catch (error: unknown) {
    next(error);
  }
};

export const updateApplicationStatusHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const applicationId = req.params.id;
    const {status} = req.body;

    const updatedApplication = await updateApplicationStatus(applicationId, {
      status,
    });
    sendResponse(
      res,
      200,
      true,
      'Application status updated successfully',
      updatedApplication,
    );
  } catch (error: unknown) {
    next(error);
  }
};

export const deleteApplicationHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const applicationId = req.params.id;
    const result = await deleteApplication(applicationId);
    sendResponse(res, 200, true, result.message);
  } catch (error: unknown) {
    next(error);
  }
};

export const getApplicationsByStatusHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {status} = req.query;
    if (typeof status !== 'string') {
      throw new Error('Status query parameter must be a string');
    }

    const applications = await getApplicationsByStatus(status);
    sendResponse(
      res,
      200,
      true,
      'Applications retrieved successfully',
      applications,
    );
  } catch (error: unknown) {
    next(error);
  }
};

export const getApplicationsBySeekerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const seekerId = req.params.seekerId;
    const applications = await getApplicationsBySeeker(seekerId);
    sendResponse(
      res,
      200,
      true,
      'Applications retrieved successfully',
      applications,
    );
  } catch (error: unknown) {
    next(error);
  }
};
