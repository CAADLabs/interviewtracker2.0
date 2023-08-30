const express = require('express');

const userController= require('../controllers/userController');
import { Request, Response, Router} from 'express';

const userRouter: Router = express.Router();

userRouter.post('/create', userController.createUser, (req: Request, res: Response) => {
  res.locals.userCreated.message === 'User created' ? res.send(201).json(res.locals.userCreated.message)
  : res.status(400).json(res.locals.userCreated.message);
}
);

userRouter.post('/login', userController.userLogin,  (req: Request, res: Response) => {
  res.locals.findUser === 'user found!' ? res.send(201).json(res.locals.findUser)
  : res.status(400).json(res.locals.findUser);
})


export default userRouter;

