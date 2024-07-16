type UserBody = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export type UserType = {
  id?: number;
  name?: string;
  email: string;
  password: string;
  role?: string;
};
