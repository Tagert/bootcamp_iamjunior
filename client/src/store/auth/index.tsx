import { create } from "zustand";
import { LoginResponseType, LoginUserResponse } from "../../types/user.types";
import { validateToken } from "../../api/validate-token";

type AuthStateType = {
  user: LoginUserResponse | null;
  isLoggedIn: boolean;
  isError: boolean;
  errorMessage: string;
  login: (loginResponse: LoginResponseType) => void;
  logout: () => void;
  setError: (isError: boolean, errorMessage: string) => void;
  checkToken: () => Promise<void>;
};

const initialState: AuthStateType = {
  user: null,
  isLoggedIn: false,
  isError: false,
  errorMessage: "",
  login: () => {},
  logout: () => {},
  setError: () => {},
  checkToken: async () => {},
};

export const useAuthStore = create<AuthStateType>((set) => ({
  ...initialState,

  user: JSON.parse(localStorage.getItem("user") || "null"),
  isLoggedIn: !!localStorage.getItem("user"),

  login: (loginResponse: LoginResponseType) => {
    set({ user: loginResponse.user, isLoggedIn: true });
    localStorage.setItem("user", JSON.stringify(loginResponse.user));
    localStorage.setItem("token", loginResponse.token);
  },

  logout: () => {
    set({ user: null, isLoggedIn: false });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },

  setError: (isError: boolean, errorMessage: string) =>
    set({ isError, errorMessage }),

  checkToken: async () => {
    const isValid = await validateToken();

    if (!isValid) {
      set((state) => {
        state.logout();
        return {};
      });
    }
  },
}));
