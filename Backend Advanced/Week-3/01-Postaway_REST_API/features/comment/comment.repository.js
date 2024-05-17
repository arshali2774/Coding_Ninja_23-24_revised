import mongoose from 'mongoose';
import { CommentSchema } from './comment.schema.js';
export const CommentModel = mongoose.model('Comments', CommentSchema);
import { PostModel } from '../post/post.repository.js';
//add a new comment
export const createCommentRepo = async (userId, postId, content) => {
  try {
    const newComment = new CommentModel({ userId, postId, content });
    const post = await PostModel.findByIdAndUpdate(
      postId,
      {
        $push: { postComments: newComment._id },
      },
      { new: true }
    );
    if (!post) {
      return {
        success: false,
        error: { statusCode: 404, msg: 'Post not found' },
      };
    }
    await newComment.save();
    return { success: true, res: newComment };
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error } };
  }
};

//get comments by postId
export const getPostCommentRepo = async (postId) => {
  try {
    const comments = await CommentModel.find({ postId }).populate({
      path: 'userId',
      select: '_id name email',
    });
    if (!comments) {
      return {
        success: false,
        error: { statusCode: 404, msg: 'Post not found' },
      };
    }
    return { success: true, res: comments };
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error } };
  }
};
//update comments by comment id
export const updateCommentRepo = async (commentId, newComment, userId) => {
  try {
    const comment = await CommentModel.findById(commentId).populate('postId');

    if (!comment) {
      return {
        success: false,
        error: { statusCode: 404, msg: 'Comment not found' },
      };
    }
    //checking if user who is logged in and trying to update the comment must be either the comment owner or post owner
    if (
      !comment.userId.equals(userId) &&
      !comment.postId.userId.equals(userId)
    ) {
      return {
        success: false,
        error: {
          statusCode: 403,
          msg: 'User is not authorized to update the comment',
        },
      };
    }
    const updatedComment = await CommentModel.findByIdAndUpdate(
      commentId,
      { content: newComment },
      { new: true }
    );
    if (!updatedComment) {
      return {
        success: false,
        error: { statusCode: 404, msg: 'Comment not found' },
      };
    }
    return { success: true, res: updatedComment };
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error } };
  }
};
//delete comments by comment id
export const deleteCommentRepo = async (commentId, userId) => {
  try {
    const comment = await CommentModel.findById(commentId).populate('postId');
    if (!comment) {
      return {
        success: false,
        error: { statusCode: 404, msg: 'Comment not found' },
      };
    }
    //checking if user who is logged in and trying to update the comment must be either the comment owner or post owner
    if (
      !comment.userId.equals(userId) &&
      !comment.postId.userId.equals(userId)
    ) {
      return {
        success: false,
        error: {
          statusCode: 403,
          msg: 'User is not authorized to update the comment',
        },
      };
    }
    const deletedComment = await CommentModel.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return {
        success: false,
        error: { statusCode: 404, msg: 'Comment not found' },
      };
    }
    return { success: true, res: deletedComment };
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error } };
  }
};
