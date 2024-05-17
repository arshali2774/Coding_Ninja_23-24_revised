import express from 'express';
import {
  createComment,
  deleteComment,
  getPostComment,
  updateComment,
} from './comment.controller.js';

const commentRouter = express.Router();

//create comment path
commentRouter.post('/:postId', createComment);
//get comments by post path
commentRouter.get('/:postId', getPostComment);
//update comment by commentId
commentRouter.put('/:commentId', updateComment);
//delete comment by commentId
commentRouter.delete('/:commentId', deleteComment);

export default commentRouter;
