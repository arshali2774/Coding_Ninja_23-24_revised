//local imports
import { customErrorHandler } from '../../middlewares/errorHandler.js';
import { hashPassword } from '../../utils/hashPassword.js';
import {
  getAllUserDataRepo,
  getSingleUserDataRepo,
  updateUserDataRepo,
  userLoginRepo,
  userRegistrationRepo,
  userRemoveAllTokenRepo,
  userRemoveTokenRepo,
  userTokenRepo,
} from './user.repository.js';
import jwt from 'jsonwebtoken';
// register user
export const userRegistration = async (req, res, next) => {
  let { password } = req.body;
  password = await hashPassword(password);
  const resp = await userRegistrationRepo({ ...req.body, password });
  if (resp.success) {
    res.status(201).json({
      success: true,
      msg: 'User registration successfull',
      resp: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

// login user
export const userLogin = async (req, res, next) => {
  const resp = await userLoginRepo(req.body);
  if (resp.success) {
    const token = jwt.sign({ _id: resp.res._id }, 'codinNinjas', {
      expiresIn: '1h',
    });
    await userTokenRepo(resp.res, token);

    res
      .cookie('jwtToken', token, {
        maxAge: 1 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .json({ success: true, msg: 'user login successfull', token });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

//logout user from single device
export const userLogout = async (req, res, next) => {
  const { jwtToken } = req.cookies;
  const id = req._id;
  const resp = await userRemoveTokenRepo(id, jwtToken);
  if (resp.success) {
    res
      .clearCookie('jwtToken')
      .json({ success: true, msg: 'logout successfull' });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

//logout user form all devices
export const userLogoutAll = async (req, res, next) => {
  const id = req._id;
  const resp = await userRemoveAllTokenRepo(id);
  res
    .clearCookie('jwtToken')
    .json({ success: true, msg: 'logout successfull' });
};

// get a singleUser details
export const getSingleUserData = async (req, res, next) => {
  const { userId } = req.params;
  const resp = await getSingleUserDataRepo(userId);
  if (resp.success) {
    return res.status(200).json({ success: true, resp: resp.res });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
// get all Users details
export const getAllUserData = async (req, res, next) => {
  const resp = await getAllUserDataRepo();
  if (resp.success) {
    return res.status(200).json({ success: true, resp: resp.res });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
//update user details
export const updateUserData = async (req, res, next) => {
  let newPassword = req.body.password;
  const id = req.params.userId;
  const userDataToUpdate = { ...req.body };
  if (newPassword) {
    newPassword = await hashPassword(newPassword);
    userDataToUpdate.password = newPassword;
  }
  const resp = await updateUserDataRepo(id, userDataToUpdate);
  if (resp.success) {
    return res.status(200).json({ success: true, resp: resp.res });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
