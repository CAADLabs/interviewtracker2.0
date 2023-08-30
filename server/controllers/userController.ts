const db = require('../models/SQLModel.ts');
import { Request, Response, NextFunction } from 'express';

export const userController: any = {};



userController.createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {username, password, firstName, lastName } = req.body;
    const values = [username, password, firstName, lastName];
    //check if username exists in database first
    const queryString = `SELECT * FROM users WHERE username = $1`; //SQL Injection Risk
    const selectResult = await db.query(queryString, [username]);
    //if exists stop
    if (selectResult || selectResult.rows.length){
      res.locals.userCreated = { message: 'username is taken'}
      return next()
    } 
    //if not, create
    const insertStr = `INSERT INTO users (username, password, first_name, last_name) VALUES ($1, $2, $3, $4)`
    const createUserQuery = await db.query(insertStr, values);
    res.locals.userCreated = { message: 'User created'}
    return next();
  } catch (err) {
    return next({
      log: `ERROR in userController.createUser: ` + err,
      message: {
        err: `trouble creating user`,
      },
    });
  }
};

userController.userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {username, password} = req.body;
    const values = [username, password]
    const queryStr = `SELECT * FROM users WHERE username = $1 and password = $2`;
    const result = await db.query(queryStr, values);
    if (result.rows.length){
      res.locals.findUser = { message: 'user found!'}
      return next();
    }
    res.locals.findUser = { message: `can't find user`}
    return next();
  } catch (err) {
    return next({
      log: `ERROR in userController.userLogin: ` + err,
      message: {
        err: `trouble finding user`,
      },
    });
  }
}

module.exports = userController;