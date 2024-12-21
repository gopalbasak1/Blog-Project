import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import AppError from '../../errors/AppError';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from './Users/Users.model';

const createUserIntoDB = async (
  name: string,
  email: string,
  password: string,
) => {
  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already exists');
  }

  // Hash the password before saving
  // const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save the user
  const newUser = await User.create({ name, email, password });

  // Exclude sensitive fields
  return {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  };
};

const authenticateUser = async (email: string, password: string) => {
  // Validate the existence of the JWT secret
  if (!config.jwt_access_secret) {
    throw new Error('JWT secret is not defined in the configuration.');
  }

  // Is User exists checking
  const user = await User.findOne({ email }).select('+password');
  //console.log(user);
  if (!user)
    throw new AppError(StatusCodes.NOT_FOUND, 'This user email is not found !');

  // Is User block checking
  const isUserBlocked = user?.isBlocked;
  //console.log(isUserBlocked);
  if (isUserBlocked)
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is block !');

  //checking if the password is correct
  const isMatch = await bcrypt.compare(password, user?.password);
  if (!isMatch) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid password!');
  }

  const token = jwt.sign(
    { email: user.email, role: user.role },
    config.jwt_access_secret,
    {
      expiresIn: config.jwt_access_expires_in,
    },
  );
  return { user, token };
};

export const AuthServices = {
  createUserIntoDB,
  authenticateUser,
};
