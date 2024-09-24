import mongoose, { Schema, Types } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String },
  password: { type: String },
  favoriteBooks: { type: Array, default: [] },
});

const userModel = mongoose.model('User', UserSchema);

export default userModel;
