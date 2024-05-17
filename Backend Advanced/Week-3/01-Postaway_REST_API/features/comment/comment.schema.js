import mongoose, { Schema } from 'mongoose';

export const CommentSchema = Schema({
  //which user commented
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'User id required'],
    ref: 'Users',
  },
  //user comment in which post
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Post id required'],
    ref: 'Posts',
  },
  //comment data
  content: {
    type: String,
    required: [true, 'need some text for comment'],
  },
});
