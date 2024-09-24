import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { BookType, UserType } from './types.js';
import {
  getBookById,
  getBooks,
  getBooksByGenre,
  getUserFavorites,
} from '../services/book.js';

export const RootQueryType = new GraphQLObjectType({
  name: 'query',
  fields: () => ({
    books: {
      type: GraphQLList(BookType),
      resolve: getBooks,
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLInt } },
      resolve: getBookById,
    },
    booksByGenre: {
      type: GraphQLList(BookType),
      args: { genere: { type: GraphQLString } },
      resolve: getBooksByGenre,
    },

    favoriteBooks: {
      type: GraphQLList(BookType),
      args: { userId: { type: GraphQLInt } },
      resolve: getUserFavorites,
    },
  }),
});
