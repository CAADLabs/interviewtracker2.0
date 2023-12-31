import express, { Express, Request, Response, NextFunction } from 'express';
import { ServerError } from '../types';
import path from 'path';

const userRouter = require('./routes/userRouter');
const dbRouter = require('./routes/dbRouter');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//route handler functions

//router
app.use('/api/user', userRouter);
app.use('/api/interview', dbRouter);

//route error handler
app.use((req: Request, res: Response) => {
  console.log('Bad incoming request from ' + req.originalUrl);
  res.status(400).send('This page does not exist.');
});

//global error handler
app.use(
  (err: ServerError, _req: Request, res: Response, _next: NextFunction) => {
    const defaultErr: ServerError = {
      log: 'Error caught in global handler',
      status: 400,
      message: { err: 'An error occured' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(err);
    console.log(errorObj.message);
    return res.status(errorObj.status).json(errorObj.message);
  }
);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
