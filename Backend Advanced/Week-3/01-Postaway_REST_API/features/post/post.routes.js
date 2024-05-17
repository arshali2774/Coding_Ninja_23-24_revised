import express from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  getAllPostsUser,
  getSinglePost,
  updatePost,
} from './post.controller.js';
import { upload } from '../../config/fileUpload.js';

const postRouter = express.Router();
//create post path
postRouter.post('/', upload.single('imageUrl'), createPost);
//get all posts by user path
postRouter.get('/', getAllPostsUser);
//get all posts path
postRouter.get('/all', getAllPosts);
//get post by postId path
postRouter.get('/:postId', getSinglePost);
//delete post by postId path
postRouter.delete('/:postId', deletePost);
//delete post by postId path
postRouter.put('/:postId', upload.single('imageUrl'), updatePost);

export default postRouter;
