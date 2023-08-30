const db = require('../models/SQLModel');
import { Request, Response, NextFunction } from 'express';
import { User, Interview, Business, Interviewer } from '../../types';

export const interviewController: any = {};

// dbController.createUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//   } catch (error) {}
// };

interviewController.updateInterview = async (
  req: Request,
  res: Response,
  next: NextFunction
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

    //create objects of each data model with data populated from req.body object

    const reqBodyInterview: { [key: string]: any } = {
      id: interview_id,
      date: date,
      business_id: business_id,
      type: interview_type,
      follow_up: follow_up,
      role: role,
      notes: notes,
      status: status,
      round: round,
      job_posting_url: job_posting_url,
      offer: offer,
      interviewer_id: interviewer_id,
      user_id: user_id,
    };

    const reqBodyBusiness: { [key: string]: any } = {
      id: business_id,
      name: business_name,
      location: location,
      industry: industry,
      number_of_employees: number_of_employees,
      type: business_type,
      company_url: company_url,
    };

    const reqBodyInterviewers: { [key: string]: any } = {
      id: interviewer_id,
      name: interviewer_name,
      email: interviewer_email,
      phone: interviewer_phone,
      business_id: business_id,
    };

    //filter through objects to return the keys associated with a value that is not null or undefined

    const interviewKeys: any[] = Object.keys(reqBodyInterview).filter(
      (key) =>
        reqBodyInterview[key] !== null && reqBodyInterview[key] !== undefined
    );
    const businessKeys: any[] = Object.keys(reqBodyBusiness).filter(
      (key) =>
        reqBodyBusiness[key] !== null && reqBodyBusiness[key] !== undefined
    );
    const interviewersKeys: any[] = Object.keys(reqBodyInterviewers).filter(
      (key) =>
        reqBodyInterviewers[key] !== null &&
        reqBodyInterviewers[key] !== undefined
    );

    //initialize strings to empty strings
    const setInterviewColumns = '';
    const setInterviewValues = '';
    const setBusinessColumns = 'businesses ';
    const setBusinessValues = '';
    const setInterviewersColumns = 'interviewers ';
    const setInterviewersValues = '';

    //if valid keys exist, populate strings for column names and upsert values
    if (interviewKeys.length > 0) {
      interviewKeys.forEach((key) => {
        setInterviewColumns.concat(`${key}, `);
        setInterviewValues.concat(`${key} = ${reqBodyInterview[key]}, `);
      });
    }
    if (businessKeys.length > 0) {
      businessKeys.forEach((key) => {
        setBusinessColumns.concat(`${key}, `);
        setBusinessValues.concat(`${reqBodyBusiness[key]}, `);
      });
    }
    if (interviewersKeys.length > 0) {
      interviewersKeys.forEach((key) => {
        setInterviewersColumns.concat(`${key}, `);
        setInterviewersValues.concat(`${reqBodyInterviewers[key]}, `);
      });
    }

    const queryStr = `
      INSERT INTO interviews ${setInterviewColumns} 
      VALUES (${setInterviewValues}) 
      ON CONFLICT ($3) WHERE id !== null, date !== null, business_id !== null, type !== null, follow_up !== null, role !== null, notes !== null, status !== null, round !== null, job_posting_url !== null, offer !== null, interviewer_id !== null, user_id !== null
      DO UPDATE SET 
      RETURNING *
    `;

    const interviewQuery = await db.query(queryStr, [
      setInterviewColumns,
      setInterviewValues,
      reqBodyInterview.id,
    ]);
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

interviewController.createInterview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let interviewer_id: number | null = null;
    let business_id: number | null = null;
    let user_id: number | null = null;
    const {
      date,
      business_name,
      type,
      follow_up,
      role,
      notes,
      status,
      round,
      offer,
      interviewer_name,
      user_name,
    } = req.body;

    if (interviewer_name !== null) {
      await getOrCreateId(interviewer_name, 'interviewers', 'name')
        .then((id) => {
          interviewer_id = id;
        })
        .catch((err) => {
          console.log(`error pulling interviewer id from database: ${err}`);
        });
    }

    if (business_name !== null) {
      await getOrCreateId(business_name, 'businesses', 'name')
        .then((id) => {
          business_id = id;
        })
        .catch((err) => {
          console.log(`error pulling business id from database: ${err}`);
        });
    }

    await getOrCreateId(user_name, 'users', 'username')
      .then((id) => {
        user_id = id;
      })
      .catch((err) => {
        console.log(`error pulling user id from database: ${err}`);
      });

    const queryString = `INSERT INTO interviews (date, business_id, type, follow_up, role, notes, status, round, offer, interviewer_id, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
    const values = [
      date,
      business_id,
      type,
      follow_up,
      role,
      notes,
      status,
      round,
      offer,
      interviewer_id,
      user_id,
    ];
    const result = await db.query(queryString, values);
    res.locals.createInterview = { message: 'Interview created' };
    return next();
  } catch (err) {
    return next({
      log: `ERROR in interviewController.createInterview: ` + err,
      message: {
        err: `Trouble creating interview`,
      },
    });
  }
};

interviewController.checkInterview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export default interviewController;

//arrays of req body elements

// const reqBodyInterviewersArr = [req.body.interviewer_id, req.body.interviewer_name, req.body.interviewer_email, req.body.interviewer_phone]

// const reqBodyBusinessArr = [req.body.business_id, req.body.business_name, req.body.location, req.body.industry, req.body.number_of_employees, req.body.business_type, req.body.company_url]

// const reqBodyInterview = [req.body.interview_id,  req.body.date, req.body.business_id, req.body.interview_type, req.body.follow_up, req.body.role, req.body.notes, req.body.status, req.body.round, req.body.job_posting_url, req.body.offer, req.body.interviewer_id, req.body.user_id]

async function getOrCreateId(
  name: string,
  tableName: string,
  valueName: string
): Promise<any> {
  try {
    // starting the transaction
    await db.query('BEGIN');

    // check if interviewer exists
    const getResult = await db.query(
      `SELECT * FROM ${tableName} WHERE ${valueName} = $1`,
      [name]
    );

    // holder variable to hold the id of the interviewer
    let found_id: number | null = null;

    // if the length on the array is greater than 0, that means there was a found value.
    if (getResult.rows.length) {
      found_id = getResult.rows[0].id;
    } else {
      // the interviewer is not found in the database, so we create them.
      const insertResult = await db.query(
        `INSERT INTO ${tableName} (${valueName}) VALUES ($1) RETURNING id`,
        [name]
      );
      found_id = insertResult.rows[0].id;
    }

    // commit the transaction
    await db.query('COMMIT');
    return found_id;
  } catch (error) {
    // if an error occurs, rollback the transaction
    await db.query('ROLLBACK');
    throw error;
  }
}
