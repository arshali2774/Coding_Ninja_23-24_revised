//third party imports
import express from 'express';
//local importsd
import {
  getAllUserData,
  getSingleUserData,
  updateUserData,
  userLogin,
  userLogout,
  userLogoutAll,
  userRegistration,
} from './user.controller.js';
import { auth } from '../../utils/jwtAuth.js';

// defaults
const userRouter = express.Router();

// signup path
userRouter.post('/signup', userRegistration);
//signin path
userRouter.post('/signin', userLogin);
//logout path
userRouter.get('/logout', auth, userLogout);
//logout from all devices path
userRouter.get('/logout-all-devices', auth, userLogoutAll);
// get a user details path
userRouter.get('/get-details/:userId', auth, getSingleUserData);
// get all user details path
userRouter.get('/get-all-details', auth, getAllUserData);
//update user data path
userRouter.put('/update-details/:userId', auth, updateUserData);
export default userRouter;
