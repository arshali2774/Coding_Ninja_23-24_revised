import express from 'express';
import { getLikes, toggleLike } from './like.controller.js';

const likeRouter = express.Router();

likeRouter.get('/toggle/:id', toggleLike);
likeRouter.get('/:id', getLikes);

export default likeRouter;
