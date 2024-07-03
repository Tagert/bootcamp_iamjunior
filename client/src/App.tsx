import { AuthProvider } from "./context/auth/AuthContext";
import { Routes } from "./routes/router";

export const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};
