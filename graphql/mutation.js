import { GraphQLObjectType, GraphQLString } from 'graphql';
import { signin, signup } from '../services/auth.js';
import { Token, UserType } from './types.js';

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
  }),
});
