import express from 'express';
import {
  getPendingRequest,
  getUserFriends,
  responseToFriendship,
  toggleFriendship,
} from './friendship.controller.js';

const friendshipRouter = express.Router();

friendshipRouter.get('/get-friends/:userId', getUserFriends);
friendshipRouter.get('/get-pending-requests', getPendingRequest);
friendshipRouter.get('/toggle-friendship/:friendId', toggleFriendship);
friendshipRouter.get('/response-to-request/:friendId', responseToFriendship);

export default friendshipRouter;
