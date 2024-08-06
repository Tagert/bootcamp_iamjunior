import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { routes } from "../../routes/routes";
import { loginApiCall, LoginCredentials } from "../../services/auth.service";
import { LOGIN_USER_QUERY_KEY, USER_QUERY_KEY } from "../query-keys";
import { LoginResponseType } from "../../types/user.types";
import { useAuthStore } from "../../store/use-auth.store";
import { getErrorMessage } from "../../utils/error-message-handler";
import { fetchUserById } from "../user/queries/fetchUserById";

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
    onSuccess: async (data) => {
      login(data);
      setError(false, "");

      await queryClient.fetchQuery({
        queryKey: [USER_QUERY_KEY, data.user.id],
        queryFn: () => fetchUserById(data.user.id),
      });

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
