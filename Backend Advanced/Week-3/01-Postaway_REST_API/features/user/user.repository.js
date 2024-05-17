import mongoose from 'mongoose';
import { UserSchema } from './user.schema.js';
import { compareHashedPassword } from '../../utils/hashPassword.js';

// getting user model
export const UserModel = mongoose.model('Users', UserSchema);

// user registeration repo
export const userRegistrationRepo = async (userData) => {
  try {
    const newUser = new UserModel(userData);
    await newUser.save();
    return { success: true };
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error } };
  }
};

//user login repo
export const userLoginRepo = async (userData) => {
  try {
    const { email, password } = userData;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return {
        success: false,
        error: { statusCode: 404, msg: 'User not found' },
      };
    } else {
      let passwordValidation = await compareHashedPassword(
        password,
        user.password
      );
      if (passwordValidation) {
        return { success: true, res: user };
      } else {
        return {
          success: false,
          error: { statusCode: 400, msg: 'Invalid Credentials' },
        };
      }
    }
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

// adding token to user's document
export const userTokenRepo = async (userData, token) => {
  try {
    const { email } = userData;
    await UserModel.findOneAndUpdate(
      { email },
      { $push: { tokens: token } },
      { new: true }
    );
    return;
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

// removing token from user's document
export const userRemoveTokenRepo = async (id, token) => {
  try {
    await UserModel.findOneAndUpdate({ _id: id }, { $pull: { tokens: token } });
    return;
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

//removing all tokens from user's document
export const userRemoveAllTokenRepo = async (id, token) => {
  try {
    await UserModel.findOneAndUpdate({ _id: id }, { $set: { tokens: [] } });
    return;
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

//getting a single user's data
export const getSingleUserDataRepo = async (id) => {
  try {
    const user = await UserModel.findById(id).select('-password -tokens');
    if (!user) {
      return {
        success: false,
        error: { statusCode: 404, msg: 'User not found' },
      };
    }
    return {
      success: true,
      res: user,
    };
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

// getting all users data
export const getAllUserDataRepo = async () => {
  try {
    const users = await UserModel.find({}).select('-password -tokens');

    return {
      success: true,
      res: users,
    };
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

// update user's data
export const updateUserDataRepo = async (id, updateDetails) => {
  try {
    const user = await UserModel.findByIdAndUpdate(id, updateDetails, {
      new: true,
    }).select('-password -tokens');
    if (!user) {
      return {
        success: false,
        error: { statusCode: 404, msg: 'User not found' },
      };
    }
    return { success: true, res: user };
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error.message },
    };
  }
};
