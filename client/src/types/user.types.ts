export type UserResponseType = {
  id: string;
  name: string;
  email: string;
};

export type LoginResponseType = {
  status: string;
  token: string;
  user: UserResponseType;
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
};
