import { Response } from 'express';

type TSuccessResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T | T[] | null;
};

const sendResponse = <T>(res: Response, data: TSuccessResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    statusCodes: data.statusCode,
    data: data.data,
  });
};

export default sendResponse;
