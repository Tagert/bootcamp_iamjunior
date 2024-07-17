import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { routes } from "../routes/routes";
import { validateEmail } from "../utils/helpers/email.validation";
import { ApiService } from "../services/api.services";
import { LOGIN_USER_QUERY_KEY } from "./query-keys";
import { LoginResponseType } from "../types/user.types";
import { useAuthStore } from "../store/auth/index";
import { getErrorMessage } from "../utils/helpers/error-message-handler";

type LoginCredentials = {
  email: string;
  password: string;
};

const loginUser = async (
  credentials: LoginCredentials
): Promise<LoginResponseType> => {
  const response = await ApiService.post("/login", credentials);

  return response.data;
};

const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { login, setError } = useAuthStore();

  return useMutation<LoginResponseType, Error, LoginCredentials>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data);
      setError(false, "");
      navigate(routes.HOME);

      queryClient.invalidateQueries({
        queryKey: [LOGIN_USER_QUERY_KEY],
      });
    },
    onError: (error) => {
      console.error("Login error:", error);
      setError(true, getErrorMessage(error));
    },
  });
};

export const useLoginUser = () => {
  const { mutate: login, isPending, isError, error } = useLogin();

  const { setError } = useAuthStore();

  const validateAndLogin = (email: string, password: string) => {
    if (!validateEmail(email)) {
      setError(true, "Please enter a valid email");
      return;
    }

    if (!email || !password) {
      setError(true, "Please fill in all fields");
      return;
    }

    login({ email, password });
  };

  return {
    validateAndLogin,
    isPending,
    isError,
    error,
  };
};
