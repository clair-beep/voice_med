import { Request, Response } from 'express';

export const getThis = function (req: Request, res: Response) {
  res.status(200).json({ name: 'john' });
};
