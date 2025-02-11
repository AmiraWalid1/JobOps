import {JobModel} from '../models/job.model';
import {CustomError} from '../utils/customError';

export const createJob = async (
  title: string,
  type: string,
  description: string,
  location: string,
  experienceLevel: string,
  employerId: string,
  applicationDeadline: Date,
  salaryMin?: number,
  salaryMax?: number,
  requiredSkills?: string[]
) => {
  const job = new JobModel({
    title,
    type,
    description,
    location,
    experienceLevel,
    employerId,
    applicationDeadline,
    salaryMin,
    salaryMax,
    requiredSkills,
  });

  await job.save();
  return job;
};

export const getJobs = async () => {
  const jobs = await JobModel.find().populate('employerId');
  return jobs;
};

export const getJobById = async (jobId: string) => {
  const job = await JobModel.findById(jobId).populate('employerId');
  if (!job) throw new CustomError(404, 'Job not found');
  return job;
};

export const updateJob = async (
  jobId: string,
  updateData: {
    title?: string;
    description?: string;
    location?: string;
    salary?: number;
  },
) => {
  const job = await JobModel.findByIdAndUpdate(jobId, updateData, {
    new: true,
  }).populate('employerId');

  if (!job) throw new CustomError(404, 'Job not found');
  return job;
};

export const deleteJob = async (jobId: string) => {
  const job = await JobModel.findByIdAndDelete(jobId);
  if (!job) throw new CustomError(404, 'Job not found');
  return {message: 'Job deleted successfully'};
};
