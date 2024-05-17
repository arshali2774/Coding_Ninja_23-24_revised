import mongoose from 'mongoose';
import { FriendshipSchema } from './friendship.schema.js';

const FriendshipModel = mongoose.model('Friends', FriendshipSchema);

// toggle friendship
export const toggleFriendshipRepo = async (userId, friendId) => {
  try {
    // Check if a friendship document exists between the two users
    // if it does we need to remove it
    const existingFriendship = await FriendshipModel.findOneAndDelete({
      $or: [
        { userId: userId, friendId: friendId, status: 'accepted' },
        { userId: friendId, friendId: userId, status: 'accepted' },
      ],
    });

    if (existingFriendship) {
      return {
        success: true,
        msg: 'Friendship removed',
      };
    } else {
      // Check if a pending friend request already exists between the users
      const pendingFriendship = await FriendshipModel.findOne({
        $or: [
          { userId: userId, friendId: friendId, status: 'pending' },
          { userId: friendId, friendId: userId, status: 'pending' },
        ],
      });
      // If a pending friend request already exists, return an error
      if (pendingFriendship) {
        return {
          success: false,
          error: {
            statusCode: 400,
            msg: 'Friend request is pending please accept or reject',
          },
        };
      }
      // Friendship doesn't exist, create it, and default status will be pending
      const newFriendship = new FriendshipModel({
        userId: userId,
        friendId: friendId,
      });
      await newFriendship.save();
      return {
        success: true,
        msg: 'Friendship request sent',
        res: newFriendship,
      };
    }
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error } };
  }
};

//accept or reject friendship
export const responseToFriendshipRepo = async (userId, friendId, status) => {
  try {
    let statusToUpdate;
    if (status === 'accept') {
      statusToUpdate = 'accepted';
      // Find the friendship document where the userId is the friend and friendId is the user
      const friendship = await FriendshipModel.findOneAndUpdate(
        { userId: friendId, friendId: userId, status: 'pending' },
        { $set: { status: statusToUpdate } },
        { new: true }
      );
      if (friendship) {
        return {
          success: true,
          msg: `Friend request ${statusToUpdate}`,
          res: friendship,
        };
      } else {
        return {
          success: false,
          error: {
            statusCode: 404,
            msg: 'Friend request not found or already accepted or rejected',
          },
        };
      }
    } else if (status === 'reject') {
      statusToUpdate = 'rejected';
      const friendship = await FriendshipModel.findOneAndDelete(
        { userId: friendId, friendId: userId, status: 'pending' },
        { $set: { status: statusToUpdate } },
        { new: true }
      );
      if (friendship) {
        return {
          success: true,
          msg: `Friend request ${statusToUpdate}`,
        };
      } else {
        return {
          success: false,
          error: {
            statusCode: 404,
            msg: 'Friend request not found or already accepted or rejected',
          },
        };
      }
    } else {
      return {
        success: false,
        error: { statusCode: 400, msg: 'Please enter a valid status value' },
      };
    }
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error } };
  }
};

//get pending request
export const getPendingRequestRepo = async (userId) => {
  try {
    const pendingRequests = await FriendshipModel.find({
      userId: userId,
      status: 'pending',
    });
    if (!pendingRequests) {
      return {
        success: false,
        error: { statusCode: 404, msg: 'Friend request not found' },
      };
    }
    return { success: true, res: pendingRequests };
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error } };
  }
};

//get a user's friends
export const getUserFriendsRepo = async (userId) => {
  try {
    const userFriends = await FriendshipModel.find({
      $or: [
        { userId: userId, status: 'accepted' },
        { friendId: userId, status: 'accepted' },
      ],
    });
    if (!userFriends) {
      return {
        success: false,
        error: { statusCode: 404, msg: 'Friend request not found' },
      };
    }
    return { success: true, res: userFriends };
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error } };
  }
};
