import axios from "axios";
import { create } from "zustand";
import { UserType } from "../../types/users.types";
import { validateEmail } from "../../utils/helpers/email.validation";

type AuthStateType = {
  user: UserType | null;
  isError: boolean;
  errorMessage: string;
  login: (email: string, password: string) => Promise<boolean>;
};

export const useAuthZustand = create<AuthStateType>((set) => ({
  user: null,
  isError: false,
  errorMessage: "",

  login: async (email: string, password: string): Promise<boolean> => {
    const loginBody = {
      email: email,
      password: password,
    };

    if (!email || !password) {
      set({ isError: true });
      set({ errorMessage: "Please fill in all fields" });

      return false;
    }

    if (!validateEmail(email)) {
      set({ isError: true });
      set({ errorMessage: "Please fill in all fields" });

      return false;
    }

    set({ isError: false });

    try {
      const res = await axios.get("http://localhost:3000/users");

      const users: UserType[] = res.data;

      const loggedUser = users.find(
        (user: UserType) =>
          user.email === loginBody.email && user.password === loginBody.password
      );

      if (loggedUser) {
        set({ user: loggedUser });
        set({ isError: false });

        return true;
      } else {
        set({ isError: true });
        set({ errorMessage: "Unrecognized username or password." });

        return false;
      }
    } catch (err) {
      console.log("err:", err);
      set({ isError: true });
      set({
        errorMessage: "An error occurred while logging in. Please try again.",
      });
      return false;
    }
  },
}));
