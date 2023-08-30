const interviewController = require('../controllers/interviewController');
import express, { Router, Request, Response, NextFunction } from 'express';

const dbRouter: Router = express.Router();

dbRouter.patch(
  '/',
  interviewController.updateInterview,
  (req: Request, res: Response) => {
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

// dbRouter.get(
//   '/:username',
//   interviewController.getInterview,
//   (req: Request, res: Response) => {
//     return res.status(200).json(res.locals.interviewData);
//   }
// );

module.exports = dbRouter;
