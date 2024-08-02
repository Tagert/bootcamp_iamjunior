import { create } from "zustand";
import { LoginResponseType, LoginUserResponse } from "../types/user.types";
import { validateToken } from "../api/validate-token";
import { fetchUserById } from "../api/user/queries/fetchUserById";

type AuthStateType = {
  user: LoginUserResponse | null;
  isLoggedIn: boolean;
  isError: boolean;
  errorMessage: string;
  login: (loginResponse: LoginResponseType) => void;
  logout: () => void;
  setError: (isError: boolean, errorMessage: string) => void;
  checkToken: () => Promise<void>;
  updateUser: (partialUser: Partial<LoginUserResponse>) => void;
  fetchUserData: (id: string) => Promise<void>;
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
  updateUser: () => {},
  fetchUserData: async () => {},
};

export const useAuthStore = create<AuthStateType>((set) => ({
  ...initialState,

  user: JSON.parse(localStorage.getItem("user") || "null"),
  isLoggedIn: !!localStorage.getItem("user"),

  login: async (loginResponse: LoginResponseType) => {
    const { token } = loginResponse;

    const user = {
      ...loginResponse.user,
      favorites: loginResponse.user.favorites || [],
    };

    try {
      const fullUser = await fetchUserById(user.id);

      const loginUser: LoginUserResponse = {
        id: fullUser.id!,
        name: fullUser.name!,
        email: fullUser.email,
        favorites: fullUser.favorites || [],
      };

      set({ user: loginUser, isLoggedIn: true });

      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Failed to fetch user data on login:", error);

      set({ user: null, isLoggedIn: false });
    }

    // set({ user, isLoggedIn: true });

    localStorage.setItem("user", JSON.stringify(user));
  },

  logout: () => {
    set({ user: null, isLoggedIn: false });

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },

  updateUser: (partialUser: Partial<LoginUserResponse>) =>
    set((state) => {
      const updatedUser = state.user ? { ...state.user, ...partialUser } : null;

      localStorage.setItem("user", JSON.stringify(updatedUser));
      return { user: updatedUser };
    }),

  fetchUserData: async (id: string) => {
    try {
      const user = await fetchUserById(id);

      set({ user: user as LoginUserResponse, isLoggedIn: true });
    } catch (error) {
      console.error("Failed to fetch user by ID:", error);

      set({ user: null, isLoggedIn: false });
    }
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
