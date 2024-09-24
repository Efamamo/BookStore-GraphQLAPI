import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { BookType, ReviewType, UserType } from './types.js';
import {
  getBookById,
  getBooks,
  getBooksByGenre,
  getUserFavorites,
} from '../services/book.js';
import { getUserById, getUsers } from '../services/auth.js';

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    users: {
      type: GraphQLList(UserType),
      resolve: getUsers,
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: getUserById,
    },
    books: {
      type: GraphQLList(BookType),
      resolve: getBooks,
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: getBookById,
    },
    booksByGenre: {
      type: GraphQLList(BookType),
      args: { genere: { type: GraphQLString } },
      resolve: getBooksByGenre,
    },
  }),
});
