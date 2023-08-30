const db = require('../models/SQLModel');
import { Request, Response, NextFunction } from 'express';
import {User, Interview, Business} from '../../types';

export const dbController: any = {};

// dbController.createUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//   } catch (error) {}
// };


dbController.updateInterview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.body.length < 2 || !req.body.interview_id) return next({
      log: 'Error caught in dbController.updateInterview',
      status: 400,
      message: {
        err: 'Invalid input, please provide an update',
      },
    });
    

    const reqBodyInterviewArr = [req.body.interview_id,  req.body.date, req.body.business_id, req.body.interview_type, req.body.follow_up, req.body.role, req.body.notes, req.body.status, req.body.round, req.body.job_posting_url, req.body.offer, req.body.interviewer_id, req.body.user_id]
    
    const reqBodyBusinessArr = [req.body.business_id, req.body.business_name, req.body.location, req.body.industry, req.body.number_of_employees, req.body.business_type, req.body.company_url]

    const reqBodyInterviewersArr = [req.body.interviewer_id, req.body.interviewer_name, req.body.interviewer_email, req.body.interviewer_phone]

    reqBodyInterviewArr.filter(item => item !== null && item !== undefined);
    reqBodyBusinessArr.filter(item => item !== null && item !== undefined);
    reqBodyInterviewersArr.filter(item => item !== null && item !== undefined);


    const setInterviewString = '';
    const setBusinessString = '';
    const setInterviewersString = '';

    for (let i = 0; i<reqBodyInterviewArr.length; i++){
      const subString = '';
      if (reqBodyInterviewArr[i] === req.body.interview_id){
        
      }

    }

    const interviewQueryString = `
      UPDATE interviewers
      SET 
      WHERE name = ind
    `
    db.query(queryStr, reqBodyArr)


  } catch (error) {

    return next({
      log: 'Error caught in dbController.updateInterview',
      error,
      status: 400,
      message: {
        err: 'An error occured when fetching your Interview information from the database',
      },
    });
  }
};

module.exports = dbController;
