import {
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { getBookAuthor, getUserFavorites } from '../services/book.js';
import { getBookReviews, getUserReviews } from '../services/review.js';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLID },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
    favoriteGenres: { type: GraphQLList(GraphQLString) },
    favoriteBooks: {
      type: GraphQLList(BookType),
      resolve: getUserFavorites,
    },
    reviews: { type: GraphQLList(ReviewType), resolve: getUserReviews },
  }),
});

export const Token = new GraphQLObjectType({
  name: 'Token',
  fields: () => ({
    message: { type: GraphQLString },
    accessToken: { type: GraphQLString },
  }),
});

export const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLNonNull(GraphQLString) },
    author: { type: GraphQLNonNull(UserType), resolve: getBookAuthor },
    genere: { type: GraphQLNonNull(GraphQLString) },
    price: { type: GraphQLNonNull(GraphQLFloat) },
    publicationDate: { type: GraphQLNonNull(GraphQLString) },
    reviews: { type: GraphQLList(ReviewType), resolve: getBookReviews },
    avgRating: { type: GraphQLFloat },
  }),
});

export const ReviewType = new GraphQLObjectType({
  name: 'Review',
  fields: () => ({
    _id: { type: GraphQLID },
    book: { type: GraphQLNonNull(BookType) },
    user: { type: GraphQLNonNull(UserType) },
    rating: { type: GraphQLNonNull(GraphQLInt) },
    comment: { type: GraphQLNonNull(GraphQLString) },
  }),
});
