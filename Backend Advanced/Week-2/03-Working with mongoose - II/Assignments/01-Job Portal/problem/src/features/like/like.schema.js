// Please don't change the pre-written code
// Import the necessary modules here

import mongoose from 'mongoose';

export const likeSchema = new mongoose.Schema({
  // Write your code here
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Which user likes'],
    ref: 'User',
  },
  likeable: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Which item is liked'],
    refPath: 'on_model',
  },
  on_model: {
    type: String,
    required: [true, 'Likeable options'],
    enum: ['User', 'Job'],
  },
});
