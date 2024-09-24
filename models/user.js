import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String },
  password: { type: String },
  favoriteGenres: { type: Array },
  favoriteBooks: { type: Array },
});

const userModel = mongoose.model('User', UserSchema);

export default userModel;
