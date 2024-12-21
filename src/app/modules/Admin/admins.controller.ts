import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utilis/catchAsync';
import sendResponse from '../../utilis/sendResponse';
import AppError from '../../errors/AppError';
import { AdminServices } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  // Call the service to block the user
  const user = await AdminServices.blockUser(userId);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
  }

  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: StatusCodes.OK,
    data: user,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id: blogId } = req.params;
  const blog = await AdminServices.deleteBlog(blogId);
  console.log(blog);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found!');
  }

  if (!blog) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      `Blog with ID ${blogId} not found!`,
    );
  }

  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
    data: blog,
  });
});

export const AdminControllers = {
  blockUser,
  deleteBlog,
};
