// Please don't change the pre-written code
// Import the necessary modules here

import mongoose from 'mongoose';

export const applyJobSchema = new mongoose.Schema({
  // Write your code here
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Valid job id required'],
    ref: 'Job',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Valid user id required'],
    ref: 'User',
  },
});
