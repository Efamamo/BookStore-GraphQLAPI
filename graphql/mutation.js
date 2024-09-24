import {
  GraphQLFloat,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { signin, signup } from '../services/auth.js';
import { BookType, Token, UserType } from './types.js';
import {
  addbook,
  addFavoriteBook,
  deletebook,
  deleteFavoriteBook,
  updatebook,
} from '../services/book.js';
import { GraphQLVoid } from 'graphql-scalars';

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    signUp: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: signup,
    },
    signIn: {
      type: Token,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: signin,
    },
    addBook: {
      type: BookType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        author: { type: GraphQLNonNull(GraphQLString) },
        genere: { type: GraphQLNonNull(GraphQLString) },
        price: { type: GraphQLNonNull(GraphQLFloat) },
        publicationDate: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: addbook,
    },

    updateBook: {
      type: BookType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        author: { type: GraphQLString },
        genere: { type: GraphQLString },
        price: { type: GraphQLFloat },
        publicationDate: { type: GraphQLString },
      },
      resolve: updatebook,
    },

    deleteBook: {
      type: GraphQLVoid,
      args: {
        id: { type: GraphQLID },
      },
      resolve: deletebook,
    },
    addFavoritebook: {
      type: GraphQLList(BookType),
      args: {
        userId: { type: GraphQLNonNull(GraphQLID) },
        bookId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: addFavoriteBook,
    },
    deleteFavoritebook: {
      type: GraphQLVoid,
      args: {
        userId: { type: GraphQLNonNull(GraphQLID) },
        bookId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: deleteFavoriteBook,
    },
  }),
});
