import { interviewController } from '../controllers/interviewController';
import express, { Router, Request, Response, NextFunction } from 'express';

const dbRouter: Router = express.Router();

dbRouter.patch(
  '/',
  interviewController.updateInterview,
  (_req: Request, res: Response) => {
    return res.status(200).json(res.locals.update);
  }
);

dbRouter.post(
  '/',
  interviewController.createInterview,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.createInterview);
  }
);

export default dbRouter;
