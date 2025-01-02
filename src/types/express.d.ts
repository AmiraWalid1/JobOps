declare namespace Express {
  export interface Request {
    user: {
      _id: string;
      email: string;
      name: string;
      Role: string;
      Rate: number;
      phoneNumber: string;
    };
  }
}
