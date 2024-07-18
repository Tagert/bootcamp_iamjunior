export type LoginUserResponse = {
  id: string;
  name: string;
  email: string;
};

export type CreateUserResponse = {
  user: UserType;
  message: string;
};

export type LoginResponseType = {
  status: string;
  token: string;
  user: LoginUserResponse;
};

export type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

// type UserBody = {
//   name: string;
//   email: string;
//   password: string;
//   role: string;
// };

export type UserType = {
  id?: number;
  name?: string;
  email: string;
  password: string;
  role?: string;
  created_at?: Date;
  updated_at?: Date;
};
