import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../Auth/Users/Users.model';
import { Blog } from '../Blog/blog.model';

const blockUser = async (userId: string) => {
  // Find the user by ID
  const user = await User.findById(userId);
  console.log(user);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
  }

  // Update the user's `isBlocked` property
  user.isBlocked = true;
  await user.save();

  return user;
};

const deleteBlog = async (id: string) => {
  // Find the blog by ID
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  // Delete the blog
  await Blog.findByIdAndDelete(id);

  return blog; // Return the blog that was deleted
};

export const AdminServices = { blockUser, deleteBlog };
