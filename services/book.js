import bookModel from '../models/books.js';
import userModel from '../models/user.js';

export async function getBooks() {
  const books = await bookModel.find();
  return books;
}

export async function getBookById(_, args) {
  const book = await bookModel.findById(args.id);
  return book;
}

export async function getBooksByGenre(_, args) {
  const books = await bookModel.find({ genere: args.genere });
  return books;
}

export async function getUserFavorites(_, args) {
  const user = await userModel.findById(args.userId);
  const books = user.favoriteBooks;
  return books;
}
