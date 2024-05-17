import mongoose from 'mongoose';

const baseUrl = process.env.MONGODB_URI || '0.0.0.0:27017';

export const connectToDb = async () => {
  try {
    await mongoose.connect(`mongodb://${baseUrl}/postaway`);
    console.log('MongoDB connected using mongoose');
  } catch (error) {
    console.log('Connect to db error:', error);
  }
};
