import mongoose from 'mongoose';
import { OtpSchema } from './otp.schema.js';
import { UserModel } from '../user/user.repository.js';
const OtpModel = mongoose.model('Otps', OtpSchema);

export const sendOtpRepo = async (userEmail) => {
  try {
    // Generate a random 6-digit OTP
    const otpGenerated = Math.floor(100000 + Math.random() * 900000);
    // Save the OTP to the database
    const otp = await OtpModel.create({ otp: otpGenerated, userEmail });
    return { success: true, msg: 'OTP sent successfully', res: otp };
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error } };
  }
};

export const verifyOtpRepo = async (otp, userEmail) => {
  try {
    const verifyOtp = await OtpModel.findOne({ otp, userEmail });
    if (!verifyOtp) {
      return {
        success: false,
        error: { statusCode: 400, msg: 'OTP not verified or OTP expired' },
      };
    }
    return { success: true, msg: 'OTP verified successfully.' };
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error } };
  }
};

export const resetPasswordRepo = async (password, email) => {
  try {
    const user = await UserModel.findOneAndUpdate(
      { email },
      { password },
      { new: true }
    );
    if (!user) {
      return {
        success: false,
        error: { statusCode: 404, msg: 'User not found' },
      };
    }
    return { success: true, msg: 'Password reset successfully' };
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};
