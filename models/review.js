import mongoose, { Schema, Types } from 'mongoose';

const ReviewSchema = new Schema({
  user_id: { type: Types.ObjectId, required: true },
  book_id: { type: Types.ObjectId, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, default: '' },
});

const reviewModel = mongoose.model('Review', ReviewSchema);

export default reviewModel;
