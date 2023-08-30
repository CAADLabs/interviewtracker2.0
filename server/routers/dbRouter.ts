const express = require('express');

const dbController = require('../controllers/dbController');
import { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.patch(
  '/interview',
  dbController.updateInterview,
  (_req: Request, res: Response) => {
    return res.status(200).json(res.locals.interview)
  },
);

module.exports = router;
