import { customErrorHandler } from '../../middlewares/errorHandler.js';
import { hashPassword } from '../../utils/hashPassword.js';
import {
  resetPasswordRepo,
  sendOtpRepo,
  verifyOtpRepo,
} from './otp.repository.js';
import nodemailer from 'nodemailer';

//send otp to email
export const sendOtp = async (req, res, next) => {
  const resp = await sendOtpRepo(req.body.email);
  if (!resp.success) {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
  // Send the OTP via email
  const transporter = nodemailer.createTransport({
    // Configure your email service provider here
    // For example, for Gmail:
    service: 'gmail',
    auth: {
      user: 'codingninjas2k16@gmail.com',
      pass: 'slwvvlczduktvhdj',
    },
  });
  const mailOptions = {
    from: 'codingninjas2k16@gmail.com',
    to: req.body.email,
    subject: 'Your OTP',
    text: `Your OTP is: ${resp.res.otp}`,
  };
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(info.response);
    }
  });
  return res.status(200).json({ success: true, msg: resp.msg });
};

//verify otp
export const verifyOtp = async (req, res, next) => {
  const verify = await verifyOtpRepo(req.body.otp, req.body.email);
  if (!verify.success) {
    next(new customErrorHandler(verify.error.statusCode, verify.error.msg));
  }
  return res.status(200).json({ success: true, msg: verify.msg });
};

//reset password
export const resetPassword = async (req, res, next) => {
  let password = req.body.newPassword;
  password = await hashPassword(password);
  const resp = await resetPasswordRepo(password, req.body.email);
  if (resp.success) {
    return res.status(201).json({ success: true, msg: resp.msg });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
