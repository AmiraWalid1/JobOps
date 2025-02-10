import {ApplicationModel} from '../models/application.model';

export const createApplication = async (applicationData: any) => {
  const {seekerId, jobId, cv, status} = applicationData;

  // Validate required fields
  if (!seekerId || !jobId || !cv) {
    throw new Error('Missing required fields');
  }

  // Create and save the application
  const newApplication = new ApplicationModel({
    seekerId,
    jobId,
    cv,
    status: status || 'pending', // Default status to "pending"
  });

  return await newApplication.save();
};

export const getAllApplications = async () => {
  return await ApplicationModel.find();
};

export const getApplicationById = async (id: string) => {
  const application = await ApplicationModel.findById(id);
  if (!application) {
    throw new Error('Application not found');
  }
  return application;
};

export const updateApplicationStatus = async (id: string, updateData: any) => {
  const updatedApplication = await ApplicationModel.findByIdAndUpdate(
    id,
    updateData,
    {new: true},
  );

  if (!updatedApplication) {
    throw new Error('Application not found');
  }

  return updatedApplication;
};

export const deleteApplication = async (id: string) => {
  const deletedApplication = await ApplicationModel.findByIdAndDelete(id);
  if (!deletedApplication) {
    throw new Error('Application not found');
  }
  return deletedApplication;
};

export const getApplicationsByStatus = async (status: string) => {
  if (!status) {
    throw new Error('Status query parameter is required');
  }
  return await ApplicationModel.find({status});
};

export const getApplicationsBySeeker = async (seekerId: string) => {
  return await ApplicationModel.find({seekerId});
};