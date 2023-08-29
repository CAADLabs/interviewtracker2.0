export type ServerError = {
    log: string;
    status: number;
    message: { err: string };
  };


export type SignUpUser = {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
};
  