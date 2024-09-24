import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
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
    id: { type: GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLNonNull(GraphQLString) },
    author: { type: GraphQLNonNull(GraphQLString) },
    genere: { type: GraphQLNonNull(GraphQLString) },
    price: { type: GraphQLNonNull(GraphQLFloat) },
    publicationDate: { type: GraphQLNonNull(GraphQLString) },
    reviews: { type: GraphQLList(ReviewType) },
    avgRating: { type: GraphQLFloat },
  }),
});

export const ReviewType = new GraphQLObjectType({
  name: 'Review',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    book: { type: GraphQLNonNull(BookType) },
    user: { type: GraphQLNonNull(UserType) },
    rating: { type: GraphQLNonNull(GraphQLInt) },
    comment: { type: GraphQLNonNull(GraphQLString) },
  }),
});
