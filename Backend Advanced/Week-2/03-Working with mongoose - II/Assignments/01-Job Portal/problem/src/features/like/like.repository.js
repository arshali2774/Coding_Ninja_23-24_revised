// Please don't change the pre-written code

import mongoose from 'mongoose';
import { likeSchema } from './like.schema.js';

// Import the necessary modules here
const LikeModel = mongoose.model('Likes', likeSchema);
export const likeRepo = async (user_id, job_id, model) => {
  // Write your code here
  const newLike = new LikeModel({
    user: user_id,
    likeable: job_id,
    on_model: model,
  });
  await newLike.save();
  return newLike;
};
export const getLikesRepo = async (id, on_model) => {
  // Write your code here
  const findLikedRepo = LikeModel.find({ likeable: id, on_model })
    .populate('user')
    .populate({ path: 'likeable', model: on_model });
  return findLikedRepo;
};
