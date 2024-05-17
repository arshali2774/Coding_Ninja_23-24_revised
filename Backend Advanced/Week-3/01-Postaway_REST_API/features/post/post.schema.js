import mongoose, { Schema } from 'mongoose';

export const PostSchema = Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Every post needs a user'],
    ref: 'Users',
  },
  imageUrl: {
    type: String,
    required: [true, 'Needs an image url'],
  },
  caption: {
    type: String,
    required: [true, 'Needs an image caption'],
  },
  postComments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comments',
      required: true,
    },
  ],
  postLikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Likes',
    },
  ],
});
