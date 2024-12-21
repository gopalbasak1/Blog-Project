import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utilis/catchAsync';
import sendResponse from '../../utilis/sendResponse';
import { BlogServices } from './blog.service';
import AppError from '../../errors/AppError';

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

export const BlogController = { createBlog };
