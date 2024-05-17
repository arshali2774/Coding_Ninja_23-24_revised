import mongoose, { Schema } from 'mongoose';

const MessageSchema = Schema({
  username: String,
  message: String,
  createdAt: Date,
});

export const ChatMessageModel = mongoose.model('ChatMessages', MessageSchema);
