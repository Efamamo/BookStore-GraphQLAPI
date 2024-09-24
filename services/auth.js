import userModel from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function signup(_, args) {
  const hashedPassword = await bcrypt.hash(args.password, 10);

  const newUser = new userModel({
    email: args.email,
    password: hashedPassword,
  });

  newUser.save();
  return newUser;
}

export async function signin(_, args) {
  const user = await userModel.findOne({ email: args.email });

  if (!user) {
    return { message: 'Invalid Credentials' };
  }

  const comparePassword = await bcrypt.compare(args.password, user.password);

  if (!comparePassword) {
    return { message: 'Invalid Credentials' };
  }

  const token = jwt.sign({ email: user.email }, 'dcfvgbhnjm,rfcdxsdcfvgbhn');
  return { accessToken: token };
}
