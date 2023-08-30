import express from 'express';

import { dbController } from '../controllers/interviewController';
import { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.post(
  '/table',
  // dbController.createTable,
  (req: Request, res: Response) => {
    return res.status(200).send('OK');
  }
);

module.exports = router;
