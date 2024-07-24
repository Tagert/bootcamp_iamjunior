import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { routes } from "../../routes/routes";
import { loginApiCall, LoginCredentials } from "../../services/auth.service";
import { LOGIN_USER_QUERY_KEY } from "../query-keys";
import { LoginResponseType } from "../../types/user.types";
import { useAuthStore } from "../../store/use-auth.store";
import { getErrorMessage } from "../../utils/helpers/error-message-handler";

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { login, setError } = useAuthStore();

  const {
    mutate: executeLogin,
    isPending,
    isError,
    error,
  } = useMutation<LoginResponseType, Error, LoginCredentials>({
    mutationFn: loginApiCall,
    onSuccess: (data) => {
      login(data);
      setError(false, "");

      navigate(routes.HOME, { state: { fromLogin: true } });

      queryClient.invalidateQueries({
        queryKey: [LOGIN_USER_QUERY_KEY],
      });
    },
    onError: (error: Error) => {
      const axiosError = error as AxiosError<{ message: string }>;
      console.error("Login error:", error);
      setError(true, getErrorMessage(error));
      toast.error(
        axiosError.response?.data.message || "Login failed. Please try again."
      );
    },
  });

  const validateAndLogin = (email: string, password: string) => {
    // if (!validateEmail(email)) {
    //   setError(true, "Please enter a valid email");
    //   return;
    // }

    if (!email || !password) {
      setError(true, "Please fill in all fields");
      return;
    }

    executeLogin({ email, password });
  };

  return {
    validateAndLogin,
    isPending,
    isError,
    error,
  };
};
