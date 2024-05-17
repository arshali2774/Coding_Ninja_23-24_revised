import mongoose from 'mongoose';
import { PostSchema } from './post.schema.js';

//model
export const PostModel = mongoose.model('Posts', PostSchema);
//create new post and save it to db
export const createPostRepo = async (postData) => {
  try {
    const newPost = new PostModel(postData);
    await newPost.save();
    return { success: true, res: newPost };
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error } };
  }
};
//get single post
export const getSinglePostRepo = async (id) => {
  try {
    const post = await PostModel.findById(id)
      .populate({
        path: 'userId',
        select: '_id name email',
      })
      .populate('postComments')
      .populate('postLikes');

    if (!post) {
      return {
        success: false,
        error: { statusCode: 404, msg: 'Post not found' },
      };
    } else {
      return { success: true, res: post };
    }
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error } };
  }
};
//get all posts by user
export const getAllPostsUserRepo = async (userId) => {
  try {
    const posts = await PostModel.find({ userId })
      .populate({
        path: 'userId',
        select: '_id name email',
      })
      .populate('postComments')
      .populate('postLikes');
    return { success: true, res: posts };
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error } };
  }
};
//get all posts
export const getAllPostsRepo = async () => {
  try {
    const posts = await PostModel.find({})
      .populate({
        path: 'userId',
        select: '_id name email',
      })
      .populate('postComments')
      .populate('postLikes');
    return { success: true, res: posts };
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error } };
  }
};
//delete post by user
export const deletePostRepo = async (userId, postId) => {
  try {
    const deletedPost = await PostModel.findOneAndDelete({
      _id: postId,
      userId,
    });
    if (!deletedPost) {
      return {
        success: false,
        error: { statusCode: 404, msg: 'Post not found' },
      };
    }
    return { success: true, res: deletedPost };
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error } };
  }
};
//update post by user
export const updatePostRepo = async (userId, postId, newData) => {
  try {
    const updatedPost = await PostModel.findOneAndUpdate(
      {
        _id: postId,
        userId,
      },
      newData,
      { new: true }
    );
    if (!updatedPost) {
      return {
        success: false,
        error: { statusCode: 404, msg: 'Post not found' },
      };
    }
    return { success: true, res: updatedPost };
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error } };
  }
};
