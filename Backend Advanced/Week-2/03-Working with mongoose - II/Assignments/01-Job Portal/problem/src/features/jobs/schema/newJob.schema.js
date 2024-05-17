// Please don't change the pre-written code
// Import the necessary modules here

import mongoose from 'mongoose';

export const jobSchema = new mongoose.Schema({
  // Write your code here
  title: { type: String, required: [true, 'Job title required.'] },
  description: { type: String, required: [true, 'Job description required.'] },
  company: { type: String, required: [true, 'Hiring company name required.'] },
  salary: { type: Number, required: [true, 'Please provide salary.'] },
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'A job needs applicants'],
      ref: 'User',
    },
  ],
});
