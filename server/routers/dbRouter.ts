import express from 'express';

import { dbController } from '../controllers/interviewController';
import { Request, Response, NextFunction } from 'express';

const router: Router = express.Router();

router.patch(
  '/interview',
  dbController.updateInterview,
  (_req: Request, res: Response) => {
    return res.status(200).json(res.locals.interview);
  }
);

module.exports = router;
