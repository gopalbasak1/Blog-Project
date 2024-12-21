import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../../Users/Users.model';
import { GetBlogsParams, TBlog } from './blog.interface';
import { Blog } from './blog.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { BlogSearchableFields } from './blog.constant';

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

const updateBlogIntoDB = async (
  id: string,
  payload: Partial<TBlog>,
  email: string,
) => {
  // Find the blog by ID and check if the logged-in user is the author
  const blog = await Blog.findById(id);

  if (!blog) {
    return null; // Blog does not exist
  }

  // Check if the logged-in user is the author of the blog
  const user = await User.findById(blog.author);
  if (user?.email !== email) {
    return null; // User is not authorized to update this blog
  }

  // // Update the blog with the provided payload
  // Object.assign(blog, payload);
  // const updatedBlog = await blog.save();

  // // Populate author details for the response
  // const populatedBlog = await Blog.findById(updatedBlog._id).populate(
  //   'author',
  //   'name email',
  // );

  //return populatedBlog;

  // Perform a partial update
  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { $set: payload }, // Update only the provided fields
    { new: true, runValidators: true }, // Return the updated document and validate the changes
  ).populate('author', 'name email');

  return updatedBlog;
};

const deleteBlogFromDB = async (id: string) => {
  const deleteBlog = await Blog.findByIdAndDelete(id, { new: true });

  if (!deleteBlog) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete blog');
  }
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(
    Blog.find().populate('author', 'name email'), // Populate author details
    query,
  )
    .search(BlogSearchableFields) // Use the constant here
    .filter() // Apply general filters
    .sort() // Apply sorting
    .fields(); // Select specific fields

  const result = await blogQuery.modelQuery.exec(); // Execute the query
  return result;
};

export const BlogServices = {
  createBlog,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogsFromDB,
};
