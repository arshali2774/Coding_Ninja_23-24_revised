import mongoose, { Schema } from 'mongoose';

const UserSchema = Schema({
  username: String,
  connected: Boolean,
});

export const ChatUserModel = mongoose.model('ChatUsers', UserSchema);
