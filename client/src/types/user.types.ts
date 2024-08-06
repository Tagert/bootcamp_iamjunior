export type LoginUserResponse = {
  id: string;
  name: string;
  email: string;
  favorites: string[];
  gender?: string;
  phone_number?: string;
  contact_email?: string;
  city?: string;
  address?: string;
  birthday?: Date;
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

export type UserBody = {
  id?: string;
  name?: string;
  gender?: string;
  phone_number?: string;
  contact_email?: string;
  city?: string;
  address?: string;
  birthday?: Date;
};

export type UserType = {
  id?: string;
  name?: string;
  gender?: string;
  phone_number?: string;
  contact_email?: string;
  city?: string;
  address?: string;
  birthday?: Date;
  email: string;
  password?: string;
  role?: string;
  favorites?: string[];
  created_at?: Date;
  updated_at?: Date;
};
