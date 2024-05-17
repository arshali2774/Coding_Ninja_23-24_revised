import { customErrorHandler } from '../../middlewares/errorHandler.js';
import {
  getPendingRequestRepo,
  getUserFriendsRepo,
  responseToFriendshipRepo,
  toggleFriendshipRepo,
} from './friendship.repository.js';

// toggle friendship controller
export const toggleFriendship = async (req, res, next) => {
  const { friendId } = req.params;
  const userId = req._id;
  if (friendId === userId) {
    return res.status(400).json({
      success: false,
      msg: 'you cannot send yourself a friend request',
    });
  }
  const resp = await toggleFriendshipRepo(userId, friendId);
  if (resp.success) {
    return res
      .status(200)
      .json({ success: true, msg: resp.msg, resp: resp.res });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

//accept reject friendship
export const responseToFriendship = async (req, res, next) => {
  const { friendId } = req.params;
  const { status } = req.query;
  const userId = req._id;
  const resp = await responseToFriendshipRepo(userId, friendId, status);
  if (resp.success) {
    return res
      .status(200)
      .json({ success: true, msg: resp.msg, resp: resp.res });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

//get pending requests
export const getPendingRequest = async (req, res, next) => {
  const userId = req._id; // because the user who is logged in can only see its own friend requests
  const resp = await getPendingRequestRepo(userId);
  if (resp.success) {
    return res.status(200).json({ success: true, resp: resp.res });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
//get user's friends
export const getUserFriends = async (req, res, next) => {
  const { userId } = req.params; // because the user who is logged in can only see its own friend requests
  const resp = await getUserFriendsRepo(userId);
  if (resp.success) {
    return res.status(200).json({ success: true, resp: resp.res });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
