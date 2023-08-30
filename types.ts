export type ServerError = {
  log: string;
  status: number;
  message: { err: string };
};

export interface Interview {
  id?: number;
  business_id: string;
  role: string;
  date: Date;
  type: string;
  status: string;
  round?: number;
  follow_up?: boolean;
  job_posting_url: string;
  offer?: number;
  notes?: string;
  interviewer_id?: number,
  user_id?: number
}

export interface User {
  user_id?: number;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface Interviewer {
  id?: number;
  name?: string;
  email?: string;
  phone?: number;
  business_id?: number;
}

export interface Business {
  id?: number;
  name: string;
  location?: string;
  industry?: string;
  number_of_employees?: number;
  type?: string;
  company_url: string;
}
