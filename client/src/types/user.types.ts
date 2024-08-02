export type LoginUserResponse = {
  id: string;
  name: string;
  email: string;
  favorites: string[];
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

export type ChangePasswordResponse = {
  user: UserType;
  message: string;
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

export type UserType = {
  id?: string;
  name?: string;
  email: string;
  password?: string;
  role?: string;
  favorites?: string[];
  created_at?: Date;
  updated_at?: Date;
};
