import { customErrorHandler } from '../../middlewares/errorHandler.js';
import {
  createCommentRepo,
  deleteCommentRepo,
  getPostCommentRepo,
  updateCommentRepo,
} from './comment.repository.js';

//add a new comment
export const createComment = async (req, res, next) => {
  const userId = req._id;
  const { postId } = req.params;
  const { content } = req.body;
  const resp = await createCommentRepo(userId, postId, content);
  if (resp.success) {
    return res.status(201).json({ success: true, resp: resp.res });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
//get comments by postId
export const getPostComment = async (req, res, next) => {
  const { postId } = req.params;
  const resp = await getPostCommentRepo(postId);
  if (resp.success) {
    return res.status(201).json({ success: true, resp: resp.res });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
//update comments by comment id
export const updateComment = async (req, res, next) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const userId = req._id;
  const resp = await updateCommentRepo(commentId, content, userId);
  if (resp.success) {
    return res.status(201).json({ success: true, resp: resp.res });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
//delete comments by comment id
export const deleteComment = async (req, res, next) => {
  const { commentId } = req.params;
  const userId = req._id;
  const resp = await deleteCommentRepo(commentId, userId);
  if (resp.success) {
    return res.status(200).json({ success: true, resp: resp.res });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
