import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utilis/catchAsync';
import sendResponse from '../../utilis/sendResponse';
import { AuthServices } from './auth.service';

const createUser = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const result = await AuthServices.createUserIntoDB(name, email, password);

  sendResponse(res, {
    success: true,
    message: 'User created successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await AuthServices.authenticateUser(email, password);

  sendResponse(res, {
    success: true,
    message: 'Login successfully',
    statusCode: StatusCodes.OK,
    data: {
      user,
      token,
    },
  });
});

export const AuthController = {
  createUser,
  login,
};
