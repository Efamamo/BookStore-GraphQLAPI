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
import { signin, signup } from './services/auth.js';
import { MutationType } from './graphql/mutation.js';
import { RootQueryType } from './graphql/query.js';

const app = express();
mongoose
  .connect('mongodb://localhost:27017/books')
  .then(console.log('Connected to DB'))
  .catch((e) => {
    console.log(e);
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
