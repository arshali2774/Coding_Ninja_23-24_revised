import { customErrorHandler } from '../../middlewares/errorHandler.js';
import { getLikesRepo, likeRepo } from './like.repository.js';

export const like = async (req, res, next) => {
  const { model, id } = req.query;
  if ((model !== 'Job' && model !== 'User') || !id) {
    return res
      .status(400)
      .json({ success: false, msg: 'Please provide a valid model and id' });
  }
  try {
    const resp = await likeRepo(req.user._id, id, model);
    if (resp) {
      res
        .status(201)
        .json({ success: true, msg: `${model} liked successfully`, resp });
    }
  } catch (error) {
    next(new customErrorHandler(400, error));
  }
};

export const getLikes = async (req, res, next) => {
  const { model, id } = req.query;
  if ((model !== 'Job' && model !== 'User') || !id) {
    return res
      .status(400)
      .json({ success: false, msg: 'Please provide a valid model and id' });
  }
  try {
    const resp = await getLikesRepo(id, model);
    if (resp) {
      res.status(200).json({ success: true, resp });
    }
  } catch (error) {
    next(new customErrorHandler(400, error));
  }
};
