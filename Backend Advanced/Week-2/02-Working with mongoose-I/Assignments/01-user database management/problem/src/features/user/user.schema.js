// Import the necessary modules here
import { Schema } from 'mongoose';
// Start creating your user schema here
export const userSchema = Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, 'The name should be at least 3 characters long'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Validate email format using a regular expression
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['student', 'fresher', 'experienced'],
  },
});
