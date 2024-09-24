import mongoose, { Schema } from 'mongoose';

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genere: { type: String, required: true },
  price: { type: Number, required: true },
  publicationDate: { type: Date, required: true },
  reviews: { type: Array },
  avgRating: { type: Number },
});

const bookModel = mongoose.model('Book', BookSchema);

export default bookModel;
