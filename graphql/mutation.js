import {
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { signin, signup } from '../services/auth.js';
import { BookType, Token, UserType } from './types.js';
import { addbook } from '../services/book.js';

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
  }),
});
