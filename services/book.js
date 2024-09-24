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
  console.log(books);
  return books;
}

export async function addbook(_, args) {
  const newBook = new bookModel({
    title: args.title,
    author: args.author,
    genere: args.genere,
    price: args.price,
    publicationDate: args.publicationDate,
  });

  await newBook.save();
  return newBook;
}

export async function updatebook(_, args) {
  const book = await bookModel.findById(args.id);
  if (args.title) {
    book.title = args.title;
  }
  if (args.author) {
    book.author = args.author;
  }
  if (args.genere) {
    book.genere = args.genere;
  }
  if (args.price) {
    book.price = args.price;
  }
  if (args.publicationDate) {
    book.publicationDate = args.publicationDate;
  }

  await book.save();
  const updatedBook = await bookModel.findById(args.id);
  return updatedBook;
}

export async function deletebook(_, args) {
  const book = await bookModel.findByIdAndDelete(args.id);
}

export async function addFavoriteBook(_, args) {
  const user = await userModel.findById(args.userId);
  const book = await bookModel.findById(args.bookId);
  user.favoriteBooks.push(book);

  await user.save();

  return user.favoriteBooks;
}

export async function deleteFavoriteBook(_, args) {
  const user = await userModel.findById(args.userId);
  user.favoriteBooks = user.favoriteBooks.filter((book) => {
    console.log(book._id);
    return book._id.toString() !== args.bookId.toString();
  });
  await user.save();
}
