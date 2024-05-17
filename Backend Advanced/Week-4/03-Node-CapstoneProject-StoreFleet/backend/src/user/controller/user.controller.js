// Please don't change the pre-written code
// Import the necessary modules here

import { sendPasswordResetEmail } from '../../../utils/emails/passwordReset.js';
import { sendWelcomeEmail } from '../../../utils/emails/welcomeMail.js';
import { ErrorHandler } from '../../../utils/errorHandler.js';
import { sendToken } from '../../../utils/sendToken.js';
import {
  createNewUserRepo,
  deleteUserRepo,
  findUserForPasswordResetRepo,
  findUserRepo,
  getAllUsersRepo,
  updateUserProfileRepo,
  updateUserRoleAndProfileRepo,
} from '../models/user.repository.js';
import crypto from 'crypto';

export const createNewUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // Implement sendWelcomeEmail function to send welcome message
    await sendWelcomeEmail(req.body);
    const newUser = await createNewUserRepo(req.body);
    await sendToken(newUser, res, 200);
  } catch (err) {
    console.log(err);
    if (err.code === 11000 && err.keyPattern.email) {
      // Duplicate email error
      return next(new ErrorHandler(400, 'Email address is already registered'));
    } else {
      // Other errors
      return next(new ErrorHandler(500, 'Internal server error'));
    }
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler(400, 'please enter email/password'));
    }
    const user = await findUserRepo({ email }, true);
    if (!user) {
      return next(
        new ErrorHandler(401, 'user not found! register yourself now!!')
      );
    }
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return next(new ErrorHandler(401, 'Invalid email or passswor!'));
    }
    await sendToken(user, res, 200);
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const logoutUser = async (req, res, next) => {
  res
    .status(200)
    .cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({ success: true, msg: 'logout successful' });
};

export const forgetPassword = async (req, res, next) => {
  // Get the email address from the request body
  const { email } = req.body;

  try {
    // Find the user with the provided email address
    const user = await findUserRepo({ email });

    if (!user) {
      // If user not found, return an error
      return next(
        new ErrorHandler(404, 'User with this email address not found')
      );
    }

    // Generate and save a password reset token for the user
    const resetToken = await user.getResetPasswordToken();
    await user.save();

    // Send the password reset email with the token
    await sendPasswordResetEmail(user, resetToken);

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Password reset email sent successfully',
    });
  } catch (error) {
    // Handle any errors
    return next(new ErrorHandler(500, 'Internal server error'));
  }
};
export const resetUserPassword = async (req, res, next) => {
  // Get the reset token from the request parameters
  const resetToken = req.params.token;
  // Get the new password from the request body
  const { newPassword, confirmPassword } = req.body;

  try {
    // Find the user with the provided reset token
    const user = await findUserForPasswordResetRepo(resetToken);

    if (!user) {
      // If no user found with the token, return an error
      return next(new ErrorHandler(400, 'Invalid or expired reset token'));
    }

    // Set the new password for the user
    user.password = newPassword;
    // Clear the reset token and expiration date
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    // Save the updated user object
    await user.save();

    // Return success response
    res
      .status(200)
      .json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    // Handle any errors
    return next(new ErrorHandler(500, 'Internal server error'));
  }
};

export const getUserDetails = async (req, res, next) => {
  try {
    const userDetails = await findUserRepo({ _id: req.user._id });
    res.status(200).json({ success: true, userDetails });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};

export const updatePassword = async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  try {
    if (!currentPassword) {
      return next(new ErrorHandler(401, 'pls enter current password'));
    }

    const user = await findUserRepo({ _id: req.user._id }, true);
    const passwordMatch = await user.comparePassword(currentPassword);
    if (!passwordMatch) {
      return next(new ErrorHandler(401, 'Incorrect current password!'));
    }

    if (!newPassword || newPassword !== confirmPassword) {
      return next(
        new ErrorHandler(401, 'mismatch new password and confirm password!')
      );
    }

    user.password = newPassword;
    await user.save();
    await sendToken(user, res, 200);
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const updateUserProfile = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const updatedUserDetails = await updateUserProfileRepo(req.user._id, {
      name,
      email,
    });
    res.status(201).json({ success: true, updatedUserDetails });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

// admin controllers
export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await getAllUsersRepo();
    res.status(200).json({ success: true, allUsers });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};

export const getUserDetailsForAdmin = async (req, res, next) => {
  try {
    const userDetails = await findUserRepo({ _id: req.params.id });
    if (!userDetails) {
      return res
        .status(400)
        .json({ success: false, msg: 'no user found with provided id' });
    }
    res.status(200).json({ success: true, userDetails });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await deleteUserRepo(req.params.id);
    if (!deletedUser) {
      return res
        .status(400)
        .json({ success: false, msg: 'no user found with provided id' });
    }

    res
      .status(200)
      .json({ success: true, msg: 'user deleted successfully', deletedUser });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const updateUserProfileAndRole = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  try {
    // // Check if the requesting user is an admin
    // if (req.user.role !== 'admin') {
    //   return next(new ErrorHandler(403, 'Unauthorized access'));
    // }

    // Update user profile and role
    const updatedUser = await updateUserRoleAndProfileRepo(id, {
      name,
      email,
      role,
    });

    // Check if user exists
    if (!updatedUser) {
      return res.status(404).json({ success: false, msg: 'User not found' });
    }

    res.status(200).json({ success: true, updatedUser });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};
