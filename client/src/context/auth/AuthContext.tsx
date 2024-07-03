import axios from "axios";
import { ReactNode, createContext, useContext, useState } from "react";
import { UserType } from "../../types/users.types";
import { validateEmail } from "../../utils/helpers/email.validation";

type AuthContextType = {
  user: UserType | null;
  isError: boolean;
  errorMessage: string;
  login: (email: string, password: string) => Promise<boolean>;
};

const defaultAuthContext: AuthContextType = {
  user: null,
  isError: false,
  errorMessage: "",
  login: async () => false,
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null);

  const [isError, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const login = async (email: string, password: string): Promise<boolean> => {
    const loginBody = {
      email: email,
      password: password,
    };

    if (!email || !password) {
      setError(true);
      setErrorMessage("Please fill in all fields");

      return false;
    }

    if (!validateEmail(email)) {
      setError(true);
      setErrorMessage("Invalid email format");

      return false;
    }

    setError(false);

    try {
      const res = await axios.get("http://localhost:3000/users");

      const users: UserType[] = res.data;

      const loggedUser = users.find(
        (user: UserType) =>
          user.email === loginBody.email && user.password === loginBody.password
      );

      console.log(loggedUser);

      if (loggedUser) {
        setUser(loggedUser);
        setError(false);
        return true;
      } else {
        setError(true);
        setErrorMessage("Unrecognized username or password.");
        return false;
      }
    } catch (err) {
      console.log("err:", err);
      setError(true);
      setErrorMessage("An error occurred while logging in. Please try again.");
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isError, errorMessage, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
