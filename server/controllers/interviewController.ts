const db = require('../models/SQLModel');
import { Request, Response, NextFunction } from 'express';
import { User, Interview, Business, Interviewer } from '../../types';

export const interviewController: any = {};

interviewController.updateInterview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log(req.body);
    if (req.body.length < 2 || !req.body.interview_id)
      return next({
        log: 'Error caught in dbController.updateInterview',
        status: 400,
        message: {
          err: 'Invalid input, please provide an update',
        },
      });

    const {
      interview_id,
      date,
      business_id,
      interview_type,
      follow_up,
      role,
      notes,
      status,
      round,
      job_posting_url,
      offer,
      interviewer_id,
      user_id,
      business_name,
      location,
      industry,
      number_of_employees,
      business_type,
      company_url,
      interviewer_name,
      interviewer_email,
      interviewer_phone,
    } = req.body;

    //create objects of each data model with data populated from req.body object

    const reqBodyInterview: { [key: string]: any } = {
      id: Number(interview_id),
      date: date,
      business_id: Number(business_id),
      type: interview_type,
      follow_up: follow_up,
      role: role,
      notes: notes,
      status: status,
      round: Number(round),
      job_posting_url: job_posting_url,
      offer: Number(offer),
      interviewer_id: Number(interviewer_id),
      user_id: Number(user_id),
    };

    const reqBodyBusiness: { [key: string]: any } = {
      id: Number(business_id),
      name: business_name,
      location: location,
      industry: industry,
      number_of_employees: Number(number_of_employees),
      type: business_type,
      company_url: company_url,
    };

    const reqBodyInterviewers: { [key: string]: any } = {
      id: Number(interviewer_id),
      name: interviewer_name,
      email: interviewer_email,
      phone: interviewer_phone,
      business_id: Number(business_id),
    };

    console.log('reqBodyInterview', reqBodyInterview);

    //filter through objects to return the keys associated with a value that is not null or undefined

    const interviewKeys: any[] = Object.keys(reqBodyInterview).filter(
      key =>
        reqBodyInterview[key] !== null && reqBodyInterview[key] !== undefined && !Number.isNaN(reqBodyInterview[key])
    );
    const businessKeys: any[] = Object.keys(reqBodyBusiness).filter(
      key =>
        reqBodyBusiness[key] !== null && reqBodyBusiness[key] !== undefined,
    );
    const interviewersKeys: any[] = Object.keys(reqBodyInterviewers).filter(
      key =>
        reqBodyInterviewers[key] !== null &&
        reqBodyInterviewers[key] !== undefined,
    );

    console.log('interview keys', interviewKeys);

    //initialize strings to empty strings
    let setInterviewColumns = '';
    let setInterviewValues = '';
    const setBusinessColumns = 'businesses ';
    const setBusinessValues = '';
    const setInterviewersColumns = 'interviewers ';
    const setInterviewersValues = '';

    console.log('typeof id', typeof reqBodyInterview.id);

    //if valid keys exist, populate strings for column names and upsert values
    if (interviewKeys.length > 0) {
      interviewKeys.forEach(key => {
        setInterviewColumns += `${key}, `;
        setInterviewValues += `${reqBodyInterview[key]}, `;
        // setInterviewValues += `${key} = ${reqBodyInterview[key]}, `;
      });
    }
    setInterviewColumns = setInterviewColumns.slice(0, -2);
    setInterviewValues = setInterviewValues.slice(0, -2);
    console.log('interview columns', setInterviewColumns);
    console.log('interview values', setInterviewValues);

    // if (interviewKeys.length > 0) {
    //   let count = 1;
    //   for (let i = 0; i<interviewKeys.length; i++){
    //     setInterviewColumns.concat(`$${count++}`);

    //   }
    // }

    if (businessKeys.length > 0) {
      businessKeys.forEach(key => {
        setBusinessColumns.concat(`${key}, `);
        setBusinessValues.concat(`${reqBodyBusiness[key]}, `);
      });
    }
    if (interviewersKeys.length > 0) {
      interviewersKeys.forEach(key => {
        setInterviewersColumns.concat(`${key}, `);
        setInterviewersValues.concat(`${reqBodyInterviewers[key]}, `);
      });
    }

    const queryStr = `
      INSERT INTO interviews ${setInterviewColumns} 
      VALUES (${setInterviewValues}) 
      ON CONFLICT id DO NOTHING
      RETURNING *
    `;

    console.log(queryStr);
    const interviewQuery = await db.query(queryStr);
    console.log('interviewQuery', interviewQuery);
    //res.locals.interview = interview;
    next();
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

export default interviewController;

//arrays of req body elements

// const reqBodyInterviewersArr = [req.body.interviewer_id, req.body.interviewer_name, req.body.interviewer_email, req.body.interviewer_phone]

// const reqBodyBusinessArr = [req.body.business_id, req.body.business_name, req.body.location, req.body.industry, req.body.number_of_employees, req.body.business_type, req.body.company_url]

// const reqBodyInterview = [req.body.interview_id,  req.body.date, req.body.business_id, req.body.interview_type, req.body.follow_up, req.body.role, req.body.notes, req.body.status, req.body.round, req.body.job_posting_url, req.body.offer, req.body.interviewer_id, req.body.user_id]
