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

    //create objects of each data model with data populated from req.body object, changing types to nums as expected on Postgres
    const reqBodyInterview: { [key: string]: any } = {
      id: Number(interview_id),
      date: date,
      // business_id: Number(business_id),
      type: interview_type,
      follow_up: follow_up,
      role: role,
      notes: notes,
      status: status,
      round: Number(round),
      job_posting_url: job_posting_url,
      offer: Number(offer),
      // interviewer_id: Number(interviewer_id),
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
      // business_id: Number(business_id),
    };

    //filter through objects to return the keys associated with a value that is not null or undefined
    const interviewKeys: any[] = Object.keys(reqBodyInterview).filter(
      key =>
        reqBodyInterview[key] !== null &&
        reqBodyInterview[key] !== undefined &&
        !Number.isNaN(reqBodyInterview[key]),
    );
    const businessKeys: any[] = Object.keys(reqBodyBusiness).filter(
      key =>
        reqBodyBusiness[key] !== null &&
        reqBodyBusiness[key] !== undefined &&
        !Number.isNaN(reqBodyBusiness[key]),
    );
    const interviewersKeys: any[] = Object.keys(reqBodyInterviewers).filter(
      key =>
        reqBodyInterviewers[key] !== null &&
        reqBodyInterviewers[key] !== undefined &&
        !Number.isNaN(reqBodyInterviewers[key]),
    );

    //initialize strings to empty strings
    let setInterviewColumns = '';
    let setInterviewValues = '';
    let setInterviewPairs = '';
    let setBusinessColumns = '';
    let setBusinessValues = '';
    let setBusinessPairs = '';
    let setInterviewersColumns = '';
    let setInterviewersValues = '';
    let setInterviewersPairs = '';

    //if valid keys exist, populate strings for column names and upsert values, and conflict update key-value pairs. if the key type is a string, add single quotes around the value
    if (interviewKeys.length > 0) {
      interviewKeys.forEach(key => {
        setInterviewColumns += `${key}, `;
        if (typeof reqBodyInterview[key] === 'string') {
          setInterviewValues += `'${reqBodyInterview[key]}', `;
          setInterviewPairs += `${key} = '${reqBodyInterview[key]}', `;
        } else {
          setInterviewValues += `${reqBodyInterview[key]}, `;
          setInterviewPairs += `${key} = ${reqBodyInterview[key]}, `;
        }
      });
    }

    if (businessKeys.length > 0) {
      businessKeys.forEach(key => {
        setBusinessColumns += `${key}, `;
        if (typeof reqBodyBusiness[key] === 'string') {
          setBusinessValues += `'${reqBodyBusiness[key]}', `;
          setBusinessPairs += `${key} = '${reqBodyBusiness[key]}', `;
        } else {
          setBusinessValues += `${reqBodyBusiness[key]}, `;
          setBusinessPairs += `${key} = ${reqBodyBusiness[key]}, `;
        }
      });
    }

    if (interviewersKeys.length > 0) {
      interviewersKeys.forEach(key => {
        setInterviewersColumns += `${key}, `;
        if (typeof reqBodyInterviewers[key] === 'string') {
          setInterviewersValues += `'${reqBodyInterviewers[key]}', `;
          setInterviewersPairs += `${key} = '${reqBodyInterviewers[key]}', `;
        } else {
          setInterviewersValues += `${reqBodyInterviewers[key]}, `;
          setInterviewersPairs += `${key} = ${reqBodyInterviewers[key]}, `;
        }
      });
    }
    //remove the trailing space and comma
    setInterviewColumns = setInterviewColumns.slice(0, -2);
    setInterviewValues = setInterviewValues.slice(0, -2);
    setInterviewPairs = setInterviewPairs.slice(0, -2);
    setBusinessColumns = setBusinessColumns.slice(0, -2);
    setBusinessValues = setBusinessValues.slice(0, -2);
    setBusinessPairs = setBusinessPairs.slice(0, -2);
    setInterviewersColumns = setInterviewersColumns.slice(0, -2);
    setInterviewersValues = setInterviewersValues.slice(0, -2);
    setInterviewersPairs = setInterviewersPairs.slice(0, -2);

    //use created strings from above to populate query strings to pass into db query
    const interviewQueryStr = `
      INSERT INTO interviews (${setInterviewColumns}) 
      VALUES (${setInterviewValues}) 
      ON CONFLICT (id) DO UPDATE SET ${setInterviewPairs}
      RETURNING *;
    `;
    const businessQueryStr = `
      INSERT INTO businesses (${setBusinessColumns}) 
      VALUES (${setBusinessValues}) 
      ON CONFLICT (id) DO UPDATE SET ${setBusinessPairs}
      RETURNING *;
    `;
    const interviewersQueryStr = `
      INSERT INTO interviewers (${setInterviewersColumns}) 
      VALUES (${setInterviewersValues}) 
      ON CONFLICT (id) DO UPDATE SET ${setInterviewersPairs}
      RETURNING *;
    `;

    const interviewCheckStr = 'SELECT * FROM "public"."interviews" LIMIT 100';
    const businessCheckStr = 'SELECT * FROM "public"."businesses" LIMIT 100';
    const interviewersCheckStr =
      'SELECT * FROM "public"."interviewers" LIMIT 100';

    console.log('interview query string', interviewQueryStr);
    console.log('business query string', businessQueryStr);
    console.log('interviewers query string', interviewersQueryStr);

    //initalize variables to hold query results
    let interviewQuery;
    let businessQuery;
    let interviewersQuery;

    //query database if each array of keys has length, check the query by querying for the table
    if (interviewKeys.length > 0) {
      interviewQuery = await db.query(interviewQueryStr);
      console.log('interviewQuery', interviewQuery.rows);
    }
    if (businessKeys.length > 0) {
      businessQuery = await db.query(businessQueryStr);
      console.log('businessQuery', businessQuery.rows);
    }
    if (interviewersKeys.length > 0) {
      interviewersQuery = await db.query(interviewersQueryStr);
      console.log('interviewersQuery', interviewersQuery.rows);
    }

    

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
