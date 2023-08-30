import { interviewController } from '../controllers/interviewController';
import express, { Router, Request, Response, NextFunction } from 'express';

const dbRouter: Router = express.Router();

dbRouter.patch(
  '/',
  interviewController.updateInterview,
  (_req: Request, res: Response) => {
    console.log('res.locals.update: ', res.locals.update);
    return res.status(200).json(res.locals.update);
  },
);

export default dbRouter;
