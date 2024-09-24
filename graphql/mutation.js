import {
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { signin, signup } from '../services/auth.js';
import { BookType, ReviewType, Token, UserType } from './types.js';
import {
  addbook,
  addFavoriteBook,
  deletebook,
  deleteFavoriteBook,
  updatebook,
} from '../services/book.js';
import { GraphQLVoid } from 'graphql-scalars';
import { addReview, deleteReview, updateReview } from '../services/review.js';

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
        author_id: { type: GraphQLNonNull(GraphQLID) },
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
        author_id: { type: GraphQLID },
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

    addReview: {
      type: ReviewType,
      args: {
        user_id: { type: GraphQLNonNull(GraphQLID) },
        book_id: { type: GraphQLNonNull(GraphQLID) },
        rating: { type: GraphQLNonNull(GraphQLInt) },
        comment: { type: GraphQLString },
      },
      resolve: addReview,
    },

    updateReview: {
      type: ReviewType,
      args: {
        id: { type: GraphQLID },
        user_id: { type: GraphQLID },
        book_id: { type: GraphQLID },
        rating: { type: GraphQLInt },
        comment: { type: GraphQLString },
      },
      resolve: updateReview,
    },

    deleteReview: {
      type: GraphQLVoid,
      args: {
        id: { type: GraphQLID },
      },
      resolve: deleteReview,
    },
  }),
});
