import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utilis/catchAsync';
import sendResponse from '../../utilis/sendResponse';
import { BlogServices } from './blog.service';
import AppError from '../../errors/AppError';
import { Blog } from './blog.model';

const createBlog = catchAsync(async (req, res) => {
  const { title, content } = req.body;
  const { email } = req.user;

  // Extract the user's ID from the authenticated request

  if (!title || !content) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Title and content are required!',
    );
  }

  // Create the blog and retrieve populated author details
  const newBlog = await BlogServices.createBlog(title, content, email);

  console.log(newBlog);

  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: StatusCodes.CREATED,
    data: newBlog,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params; // Extract blog ID from the request URL
  const { title, content } = req.body; // Extract the fields to be updated
  const { email } = req.user; // Extract the logged-in user's email from the token

  if (!title && !content) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'At least one field (title or content) must be provided for update!',
    );
  }

  // Call the service to update the blog
  const updatedBlog = await BlogServices.updateBlogIntoDB(
    id,
    { title, content },
    email,
  );

  if (!updatedBlog) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Blog not found or you do not have permission to update this blog!',
    );
  }

  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: StatusCodes.OK,
    data: updatedBlog,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.deleteBlogFromDB(id);

  sendResponse(res, {
    success: true,
    message: 'Blog is deleted successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogsFromDB(req.query);
  console.log(result);
  sendResponse(res, {
    success: true,
    message: 'Blogs fetched successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const BlogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
