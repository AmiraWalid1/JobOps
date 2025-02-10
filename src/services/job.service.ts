import {JobModel} from '../models/job.model';

export const createJob = async (jobData: any) => {
  const newJob = new JobModel(jobData);
  return await newJob.save();
};

export const getAllJobs = async () => {
  return await JobModel.find();
};

export const getJobById = async (id: string) => {
  const job = await JobModel.findById(id);
  if (!job) {
    throw new Error('Job not found');
  }
  return job;
};

export const updateJob = async (id: string, updateData: any) => {
  const updatedJob = await JobModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!updatedJob) {
    throw new Error('Job not found');
  }

  return updatedJob;
};

export const deleteJob = async (id: string) => {
  const deletedJob = await JobModel.findByIdAndDelete(id);
  if (!deletedJob) {
    throw new Error('Job not found');
  }
  return deletedJob;
};
