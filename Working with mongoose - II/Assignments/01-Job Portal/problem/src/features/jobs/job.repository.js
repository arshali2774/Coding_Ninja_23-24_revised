// Please don't change the pre-written code

import mongoose from 'mongoose';
import { jobSchema } from './schema/newJob.schema.js';
import { applyJobSchema } from './schema/applyJob.schema.js';
// Import the necessary modules here
const JobModel = mongoose.model('Job', jobSchema);
const ApplyJobModel = mongoose.model('JobApplicants', applyJobSchema);
export const createNewJob = async (job) => {
  // Write your code here
  const newJob = new JobModel(job);
  const res = await newJob.save();
  return res;
};

export const applyJobRepo = async (jobId, userId) => {
  // Write your code here
  const job = await JobModel.findById(jobId);
  const isAlreadyApplied = job.applicants.includes(userId);
  if (isAlreadyApplied) {
    throw new Error('You have already applied for this job.');
  }
  job.applicants.push(userId);
  await job.save();
  const newApplicant = new ApplyJobModel({ jobId, userId });
  await newApplicant.save();
  return job;
};
export const findJobRepo = async (_id) => {
  // Write your code here
  const jobRepo = await JobModel.findById(_id);
  return jobRepo;
};
