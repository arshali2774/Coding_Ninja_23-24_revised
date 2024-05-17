// Please don't change the pre-written code

import mongoose from 'mongoose';
import UserSchema from './user.schema.js';
import bcrypt from 'bcrypt';
// Import the necessary modules here
const UserModel = mongoose.model('users', UserSchema);
export const userRegisterationRepo = async (userData) => {
  // Write your code here
  try {
    // Create a new user instance using the UserModel schema
    const newUser = new UserModel(userData);
    // Save the new user to the database
    const savedUser = await newUser.save();

    // Return success response
    return {
      success: true,
      res: savedUser,
    };
  } catch (error) {
    const errorMessages = error.message;
    return {
      success: false,
      error: {
        statusCode: 400,
        msg: errorMessages,
      },
    };
  }
};
export const userLoginRepo = async (userData) => {
  // Write your code here
  try {
    const { email, password } = userData;

    // Find the user by their email
    const user = await UserModel.findOne({ email });

    if (!user) {
      // User not found, return appropriate error response
      return {
        success: false,
        error: {
          statusCode: 404,
          msg: 'User not found',
        },
      };
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Passwords don't match, return appropriate error response
      return {
        success: false,
        error: {
          statusCode: 401,
          msg: 'Incorrect password',
        },
      };
    }

    // User authenticated successfully, return user data
    return {
      success: true,
      res: user,
    };
  } catch (error) {
    console.error('User login error:', error);
    // Handle unexpected errors
    return {
      success: false,
      error: {
        statusCode: 500,
        msg: 'Internal Server Error',
      },
    };
  }
};

export const updateUserPasswordRepo = async (_id, newpassword, next) => {
  // Write your code here
  try {
    // Find the user by their _id
    const user = await UserModel.findById(_id);

    if (!user) {
      // User not found, return appropriate error response
      return {
        success: false,
        error: {
          statusCode: 404,
          msg: 'User not found',
        },
      };
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newpassword, 12);

    // Update the user's password
    user.password = hashedPassword;

    // Save the updated user to the database
    await user.save();

    // Return success response
    return {
      success: true,
      msg: 'Password updated successfully',
    };
  } catch (error) {
    console.error('Update user password repo error:', error);
    // Handle unexpected errors
    return {
      success: false,
      error: {
        statusCode: 500,
        msg: 'Internal Server Error',
      },
    };
  }
};
