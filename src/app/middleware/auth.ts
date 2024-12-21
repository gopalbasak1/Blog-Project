import { StatusCodes } from 'http-status-codes';
import AppError from '../errors/AppError';
import catchAsync from '../utilis/catchAsync';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/Auth/Users/user.constant';

const auth = (...requiredRoles: TUserRole[]) => {
  // const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //if the token is sent from the client
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from 'Bearer <token>'
    console.log('Extracted Token:', token);
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
    }
    //check if the token is valid
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(
            StatusCodes.UNAUTHORIZED,
            'You are not authorized',
          );
        }
        const role = (decoded as JwtPayload).role;
        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(
            StatusCodes.UNAUTHORIZED,
            'You are not authorized !',
          );
        }
        // decoded undefined

        req.user = decoded as JwtPayload & { id: string; role: TUserRole };
        next();
      },
    );
  });
};

export default auth;
