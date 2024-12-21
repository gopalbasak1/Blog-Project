/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import { User } from '../Auth/Users/Users.model';

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
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'User is not authorized to update this blog',
    );
  }

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

const getAllBlogsFromDB = async ({
  search,
  sortBy = 'createdAt',
  sortOrder = 'desc',
  filter,
}: {
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  filter?: string;
}) => {
  const query: any = {};

  // Search blogs by title or content
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }

  // Filter blogs by author ID
  if (filter) {
    query.author = filter;
  }

  // Sorting
  const sortCriteria: any = {};
  sortCriteria[sortBy] = sortOrder === 'asc' ? 1 : -1;

  // Fetch blogs from the database
  const blogs = await Blog.find(query)
    .sort(sortCriteria)
    .populate('author', 'name email');

  return blogs;
};

// const getAllBlogs = async ({
//   search,
//   sortBy = 'createdAt',
//   sortOrder = 'desc',
//   filter,
// }: {
//   search?: string;
//   sortBy?: string;
//   sortOrder?: string;
//   filter?: string;
// }) => {
//   const query: any = {};

//   // Search blogs by title or content
//   if (search) {
//     query.$or = [
//       { title: { $regex: search, $options: 'i' } },
//       { content: { $regex: search, $options: 'i' } },
//     ];
//   }

//   // Filter blogs by author ID
//   if (filter) {
//     query.author = filter;
//   }

//   // Sorting
//   const sortCriteria: any = {};
//   sortCriteria[sortBy] = sortOrder === 'asc' ? 1 : -1;

//   // Fetch blogs from the database
//   const blogs = await Blog.find(query)
//     .sort(sortCriteria)
//     .populate('author', 'name email');

//   return blogs;
// };

export const BlogServices = {
  createBlog,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogsFromDB,
  //getAllBlogs,
};
