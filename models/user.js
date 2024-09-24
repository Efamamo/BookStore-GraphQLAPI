import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String },
  password: { type: String },
});

const userModel = mongoose.model('User', UserSchema);

export default userModel;
