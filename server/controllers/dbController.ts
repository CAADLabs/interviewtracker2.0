const db = require('../models/SQLModel');
import { Request, Response, NextFunction } from 'express';

export const dbController: any = {};

// dbController.createUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//   } catch (error) {}
// };

dbController.updateTable = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {} = req.body;
  } catch (error) {}
};

module.exports = dbController;
