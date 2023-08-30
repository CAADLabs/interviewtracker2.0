const express = require('express');

const dbController = require('../controllers/dbController');
import { Request, Response, NextFunction, Router } from 'express';

const router: Router = express.Router();

router.post(
  '/table',
  dbController.createTable,
  (req: Request, res: Response) => {
    res.status(200);
  },
);

module.exports = router;
