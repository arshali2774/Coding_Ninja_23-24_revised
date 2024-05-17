import mongoose, { Schema } from 'mongoose';

export const UserSchema = Schema({
  name: { type: String, required: [true, 'User name required'] },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        // Regular expression for email validation
        return /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: { type: String, required: [true, 'Password required'] },
  gender: {
    type: String,
    enum: {
      values: ['Male', 'Female', 'Other'],
      message: `{VALUE} is not supported`,
    },
    required: [true, 'Please select a gender'],
  },
  tokens: [{ type: String }],
});
