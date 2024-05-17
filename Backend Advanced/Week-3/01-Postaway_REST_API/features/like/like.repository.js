import mongoose from 'mongoose';
import { LikeSchema } from './like.schema.js';
import { CommentModel } from '../comment/comment.repository.js';
import { PostModel } from '../post/post.repository.js';
export const LikeModel = mongoose.model('Likes', LikeSchema);

// toggle like on post or comment
export const toggleLikeRepo = async (id, userId, type) => {
  //this id can be postId or commentId.
  // anyone who is logged in can toggle like on a post or comment.
  try {
    // Check if a like document exists for the given entity and user and type
    const likeDocument = await LikeModel.findOne({
      userWhoLiked: userId,
      likeable: id,
      on_model: type,
    });
    // If a like document exists, remove it; otherwise, add a new one
    if (likeDocument) {
      await LikeModel.findByIdAndDelete(likeDocument._id);
      if (type === 'Posts') {
        const post = await PostModel.findByIdAndUpdate(
          id,
          { $pull: { postLikes: likeDocument._id } },
          { new: true }
        );
        if (!post) {
          return {
            success: false,
            error: { statusCode: 404, msg: 'Post not found' },
          };
        }
      }
    } else {
      // Create a new like document
      const newLike = new LikeModel({
        userWhoLiked: userId,
        likeable: id,
        on_model: type,
      });
      //check if the id for the type exists
      // type can be either comment or posts
      if (type === 'Comments') {
        const comment = await CommentModel.findById(id);
        if (!comment) {
          return {
            success: false,
            error: { statusCode: 404, msg: 'Comment not found' },
          };
        }
      } else if (type === 'Posts') {
        const post = await PostModel.findByIdAndUpdate(
          id,
          { $push: { postLikes: newLike._id } },
          { new: true }
        );
        if (!post) {
          return {
            success: false,
            error: { statusCode: 404, msg: 'Post not found' },
          };
        }
      }
      await newLike.save();
    }
    return { success: true, res: 'Like toggled successfully' };
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error } };
  }
};

//get likes for specific post or comment
export const getLikesRepo = async (id) => {
  try {
    const likes = await LikeModel.find({ likeable: id })
      .populate({ path: 'userWhoLiked', select: '_id name email' })
      .populate('likeable');
    return { success: true, res: likes };
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error } };
  }
};
