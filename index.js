import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLSchema,
} from 'graphql';
import userModel from './models/user.js';

const app = express();
mongoose
  .connect('mongodb://localhost:27017/books')
  .then(console.log('Connected to DB'))
  .catch((e) => {
    console.log(e);
  });

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: 'query',
  fields: () => ({
    users: {
      type: GraphQLList(UserType),
      resolve: () => users,
    },
  }),
});

const Token = new GraphQLObjectType({
  name: 'Token',
  fields: () => ({
    message: { type: GraphQLString },
    accessToken: { type: GraphQLString },
  }),
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    signUp: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        const hashedPassword = await bcrypt.hash(args.password, 10);

        const newUser = new userModel({
          email: args.email,
          password: hashedPassword,
        });

        newUser.save();
        return newUser;
      },
    },
    signIn: {
      type: Token,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        const user = await userModel.findOne({ email: args.email });

        if (!user) {
          return { message: 'Invalid Credentials' };
        }

        const comparePassword = await bcrypt.compare(
          args.password,
          user.password
        );

        if (!comparePassword) {
          return { message: 'Invalid Credentials' };
        }

        const token = jwt.sign(
          { email: user.email },
          'dcfvgbhnjm,rfcdxsdcfvgbhn'
        );
        return { accessToken: token };
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: MutationType,
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(4000);
