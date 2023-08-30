import { interviewController } from '../controllers/interviewController';
import express, { Router, Request, Response, NextFunction } from 'express';

const router: Router = express.Router();

router.patch(
  '/interview',
  interviewController.updateInterview,
  (_req: Request, res: Response) => {
    return res.status(200).json(res.locals.interview);
  }
);

module.exports = router;
