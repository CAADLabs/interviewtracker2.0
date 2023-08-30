import { interviewController } from '../controllers/interviewController';
import express, { Router, Request, Response, NextFunction } from 'express';

const dbRouter: Router = express.Router();

<<<<<<< HEAD
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
=======
dbRouter.patch(
  '/',
  interviewController.updateInterview,
  (_req: Request, res: Response) => {
    console.log('res.locals.update: ', res.locals.update);
    return res.status(200).json(res.locals.update);
  },
);

export default dbRouter;
>>>>>>> 0653e6d562a8a9c363520b2a41f6a8a1f68ef26e
