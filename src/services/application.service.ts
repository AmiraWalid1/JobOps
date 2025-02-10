import {ApplicationModel} from '../models/application.model';
import {CustomError} from '../utils/customError';

export const createApplication = async (applicationData: {
  seekerId: string;
  jobId: string;
  cv: string;
  status?: string;
}) => {
  const {seekerId, jobId, cv, status} = applicationData;

  // Validate required fields
  if (!seekerId || !jobId || !cv) {
    throw new CustomError(400, 'Missing required fields');
  }

  // Create and save the application
  const newApplication = new ApplicationModel({
    seekerId,
    jobId,
    cv,
    status: status || 'pending', // Default status to "pending"
  });

  await newApplication.save();
  return newApplication;
};

export const getAllApplications = async () => {
  return await ApplicationModel.find().populate('seekerId jobId');
};

export const getApplicationById = async (id: string) => {
  const application =
    await ApplicationModel.findById(id).populate('seekerId jobId');
  if (!application) {
    throw new CustomError(404, 'Application not found');
  }
  return application;
};

export const updateApplicationStatus = async (
  id: string,
  updateData: {status?: string},
) => {
  const updatedApplication = await ApplicationModel.findByIdAndUpdate(
    id,
    updateData,
    {new: true},
  ).populate('seekerId jobId');

  if (!updatedApplication) {
    throw new CustomError(404, 'Application not found');
  }

  return updatedApplication;
};

export const deleteApplication = async (id: string) => {
  const deletedApplication = await ApplicationModel.findByIdAndDelete(id);
  if (!deletedApplication) {
    throw new CustomError(404, 'Application not found');
  }
  return {message: 'Application deleted successfully'};
};

export const getApplicationsByStatus = async (status: string) => {
  if (!status) {
    throw new CustomError(400, 'Status query parameter is required');
  }
  return await ApplicationModel.find({status}).populate('seekerId jobId');
};

export const getApplicationsBySeeker = async (seekerId: string) => {
  return await ApplicationModel.find({seekerId}).populate('seekerId jobId');
};
