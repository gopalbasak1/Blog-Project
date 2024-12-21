import { AnyZodObject } from 'zod';
import catchAsync from '../utilis/catchAsync';
import { NextFunction, Request, Response } from 'express';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //validation check
    //if everything all right()->
    await schema.parseAsync({
      body: req.body,
    });
    next();
  });
};

export default validateRequest;
