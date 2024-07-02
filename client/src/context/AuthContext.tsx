import axios from "axios";
import { ReactNode, createContext, useContext, useState } from "react";
import { UserType } from "../types/users.types";
import { validateEmail } from "../utils/helpers/email.validation";

type AuthContextType = {
  user: UserType | null;
  isError: boolean;
  errorMessage: string;
  login: (email: string, password: string) => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const defaultAuthContext: AuthContextType = {
  user: null,
  isError: false,
  errorMessage: "",
  login: async () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null);

  const [isError, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const login = async (email: string, password: string) => {
    const loginBody = {
      email: email,
      password: password,
    };

    if (!email || !password) {
      setError(true);
      setErrorMessage("Please fill in all fields");

      return;
    }

    if (!validateEmail(email)) {
      setError(true);
      setErrorMessage("Invalid email format");

      return;
    }

    setError(false);

    try {
      const res = await axios.get("http://localhost:3000/users");

      const users: UserType[] = res.data;

      const isUser: boolean = users.some(
        (user: UserType) =>
          user.email === loginBody.email && user.password === loginBody.password
      );

      if (isUser) {
        setUser(loginBody);
        setError(false);

        return true;
      } else {
        setError(true);
        setErrorMessage("Unrecognized username or password.");

        return false;
      }
    } catch (err) {
      setError(true);
      console.log("err:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isError, errorMessage, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
