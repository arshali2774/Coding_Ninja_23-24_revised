import { customErrorHandler } from '../../middlewares/errorHandler.js';
import { getLikesRepo, toggleLikeRepo } from './like.repository.js';

export const toggleLike = async (req, res, next) => {
  const { id } = req.params;
  const { type } = req.query;
  const userId = req._id;
  if ((type !== 'Comments' && type !== 'Posts') || !id) {
    return res.status(400).json({
      success: false,
      msg: `${type} not supported or id not provided`,
    });
  }
  const resp = await toggleLikeRepo(id, userId, type);
  if (resp.success) {
    return res.status(200).json({
      success: true,
      msg: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

export const getLikes = async (req, res, next) => {
  const { id } = req.params;
  const resp = await getLikesRepo(id);
  if (resp.success) {
    return res.status(200).json({
      success: true,
      resp: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
