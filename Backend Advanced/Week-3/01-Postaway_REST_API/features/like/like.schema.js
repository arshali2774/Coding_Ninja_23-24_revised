import mongoose, { Schema } from 'mongoose';

export const LikeSchema = Schema({
  userWhoLiked: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'User id required'],
    ref: 'Users',
  },
  likeable: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Select item to be liked'],
    refPath: 'on_model',
  },
  on_model: {
    type: String,
    required: [true, 'Please choose one model'],
    enum: {
      values: ['Comments', 'Posts'],
      message: `{VALUE} is not supported`,
    },
  },
});
