import express from 'express';
import { resetPassword, sendOtp, verifyOtp } from './otp.controller.js';
const otpRouter = express.Router();

otpRouter.post('/send', sendOtp);
otpRouter.post('/verify', verifyOtp);
// now we can cahnge the passoword
otpRouter.post('/reset-password', resetPassword);
export default otpRouter;
