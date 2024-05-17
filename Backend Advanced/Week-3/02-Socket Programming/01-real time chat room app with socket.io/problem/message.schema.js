import mongoose, { Schema } from 'mongoose';

const messageSchema = Schema({
  username: String,
  message: String,
  timestamp: Date,
});

export const MessageModel = mongoose.model('Messages', messageSchema);
