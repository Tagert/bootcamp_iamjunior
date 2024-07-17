import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/auth";

interface AuthWrapperProps {
  children: ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const navigate = useNavigate();
  const { checkToken, isLoggedIn } = useAuthStore();

  useEffect(() => {
    const performCheck = async () => {
      if (!isLoggedIn) {
        navigate("/login");
        return;
      }
      await checkToken();
      if (!useAuthStore.getState().isLoggedIn) {
        navigate("/login");
      }
    };

    performCheck();

    const intervalId = setInterval(performCheck, 1 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [checkToken, navigate, isLoggedIn]);

  return <>{children}</>;
};
