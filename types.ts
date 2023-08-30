export type ServerError = {
  log: string;
  status: number;
  message: { err: string };
};

export interface Interview {
  interview_id?: number;
  business_name: string;
  role: string;
  date: Date;
  interview_type: string;
  status: string;
  round?: number;
  interviewer: Interviewer;
  follow_up?: boolean;
  job_posting_url: string;
  offer?: number;
  notes?: string;
}

export interface User {
  user_id?: number;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface Interviewer {
  interviewer_id?: number;
  interviewer_name?: string;
  interviewer_email?: string;
  interviewer_phone?: number;
  business_id?: number;
}

export interface Business {
  business_id?: number;
  business_name: string;
  location?: string;
  industry?: string;
  number_of_employees?: number;
  business_type?: string;
  company_url: string;
}
