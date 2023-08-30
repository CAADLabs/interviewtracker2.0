import { interviewController } from '../controllers/interviewController';
import express, { Router, Request, Response, NextFunction } from 'express';

const router: Router = express.Router();

router.patch(
  '/',
  interviewController.updateInterview,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.interview);
  }
);

router.post(
  '/',
  interviewController.createInterview,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.createInterview);
  }
);

module.exports = router;
