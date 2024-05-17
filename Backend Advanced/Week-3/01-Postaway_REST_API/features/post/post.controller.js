import { customErrorHandler } from '../../middlewares/errorHandler.js';
import {
  createPostRepo,
  deletePostRepo,
  getAllPostsRepo,
  getAllPostsUserRepo,
  getSinglePostRepo,
  updatePostRepo,
} from './post.repository.js';

// controller for creating new post
export const createPost = async (req, res, next) => {
  const userId = req._id;
  const { caption } = req.body;
  const imageUrl = req.file.filename;
  const postData = { userId, imageUrl, caption };
  const resp = await createPostRepo(postData);
  if (resp.success) {
    return res.status(201).json({ success: true, resp: resp.res });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
//get single post
export const getSinglePost = async (req, res, next) => {
  const postId = req.params.postId;
  const resp = await getSinglePostRepo(postId);
  if (resp.success) {
    return res.status(200).json({ success: true, resp: resp.res });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
// get all posts by user
export const getAllPostsUser = async (req, res, next) => {
  const userId = req._id;
  const resp = await getAllPostsUserRepo(userId);

  if (resp.success) {
    return res.status(200).json({ success: true, resp: resp.res });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
// get all posts
export const getAllPosts = async (req, res, next) => {
  const resp = await getAllPostsRepo();

  if (resp.success) {
    return res.status(200).json({ success: true, resp: resp.res });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
//delete post by user
export const deletePost = async (req, res, next) => {
  const userId = req._id;

  const { postId } = req.params;
  const resp = await deletePostRepo(userId, postId);
  if (resp.success) {
    return res.status(200).json({
      success: true,
      msg: 'Post deleted successfully',
      resp: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
//update post by user
export const updatePost = async (req, res, next) => {
  const userId = req._id;
  const { postId } = req.params;
  const { caption } = req.body;
  const imageUrl = req.file.filename;
  const newData = { imageUrl, caption };
  const resp = await updatePostRepo(userId, postId, newData);
  if (resp.success) {
    return res.status(200).json({
      success: true,
      msg: 'Post updated successfully',
      resp: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
