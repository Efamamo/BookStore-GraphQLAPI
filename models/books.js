import mongoose, { Schema, Types } from 'mongoose';

const BookSchema = new Schema({
  title: { type: String, required: true },
  author_id: { type: Types.ObjectId, required: true },
  genere: { type: String, required: true },
  price: { type: Number, required: true },
  publicationDate: { type: String, required: true },
  reviews: { type: Array },
  avgRating: { type: Number },
});

const bookModel = mongoose.model('Book', BookSchema);

export default bookModel;
