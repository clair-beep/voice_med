import { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    searchQuery: string;
    pagination: {
      page: number;
      limit: number;
      startIndex: number;
      endIndex: number;
    };
  }
}

export const searchAndPaginationMiddleware = (
  req: Request, // Use ExtendedRequest instead of Request
  res: Response,
  next: NextFunction,
): any => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  req.pagination = {
    page,
    limit,
    startIndex,
    endIndex,
  };
  next();
};
