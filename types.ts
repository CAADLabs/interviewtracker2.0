export type ServerError = {
    log: string;
    status: number;
    message: { err: string };
  };
 
export interface Interview {
  id?: number,
  business_name: string,
  role: string,
  date: Date,
  interview_type: string,
  status: string,
  round?: number,
  interviewer?: string,
  interviewer_phone?: string,
  interviewer_email?: string,
  follow_up?: boolean,
  job_posting_url: string,
  offer?: number,
  notes?: string,
}

export interface User {
  id?: number;
  username: string,
  password: string, 
  firstName?: string,
  lastName?: string
}

export interface Business {
  id?: number,
  business_name: string,
  location?: string,
  industry?: string,
  number_of_employees?: number;
  business_type?: string,
  company_url: string
}
