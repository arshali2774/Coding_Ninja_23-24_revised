// make the necessary imports here

import mongoose, { Schema } from 'mongoose';

// implement the below schema
const messageSchema = Schema({
  username: String,
  message: String,
  timestamp: Date,
});

export const ChatModel = mongoose.model('Chats', messageSchema);
