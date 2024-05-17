import mongoose from 'mongoose';

export const connectToDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/chatterUp');
    console.log('Connected to DB');
  } catch (error) {
    console.log(error);
  }
};
