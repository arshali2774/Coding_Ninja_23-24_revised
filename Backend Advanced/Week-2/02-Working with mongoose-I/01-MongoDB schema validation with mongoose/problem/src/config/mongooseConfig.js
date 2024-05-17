// Please don't change the pre-written code
// Import the necessary modules here

import mongoose from 'mongoose';

export const connectUsingMongoose = async () => {
  // write your code here
  try {
    await mongoose.connect('mongodb://localhost:27017', {
      useNewUrlParser: true,
    });
    console.log('Db connected');
  } catch (error) {
    console.log(error);
  }
};
