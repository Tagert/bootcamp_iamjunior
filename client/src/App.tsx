import { AuthProvider } from "./context/AuthContext";
import { Routes } from "./routes/router";

export const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};
