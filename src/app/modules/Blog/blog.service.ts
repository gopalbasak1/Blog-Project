import { User } from '../../Users/Users.model';
import { Blog } from './blog.model';

const createBlog = async (title: string, content: string, email: string) => {
  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Author not found');
  }
  // Create the blog
  const newBlog = await Blog.create({ title, content, author: user._id });

  // Populate the author details (e.g., name and email)
  const populatedBlog = await Blog.findById(newBlog._id).populate(
    'author',
    'name email',
  );

  return populatedBlog;
};

export const BlogServices = { createBlog };
