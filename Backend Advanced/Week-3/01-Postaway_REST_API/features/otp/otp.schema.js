import { Schema } from 'mongoose';

export const OtpSchema = new Schema({
  otp: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{6}$/.test(v); // Validate that OTP is exactly 6 digits
      },
      message: (props) =>
        `${props.value} is not a valid OTP. It must be a 6-digit number.`,
    },
  },
  userEmail: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    lowercase: true, // Convert email to lowercase before saving
    validate: {
      validator: function (v) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v); // Validate email format
      },
      message: (props) => `${props.value} is not a valid email address.`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // TTL (Time-To-Live) set to 5 minutes (300 seconds)
  },
});
