// make necessary imports here

import mongoose, { Schema } from 'mongoose';

// write your code here
export const reviewSchema = new Schema({
  text: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  target: { type: String, required: true, enum: ['Author', 'Book'] },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'target',
  },
});
