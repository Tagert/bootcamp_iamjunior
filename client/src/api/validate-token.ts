import { jwtDecode } from "jwt-decode";
import { ApiService } from "../services/api.services";

export const validateToken = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);

    const currentTime = Date.now() / 1000;

    if (decodedToken.exp && decodedToken.exp < currentTime) {
      // eslint-disable-next-line no-console
      console.log("Token expired");
      return false;
    }

    const response = await ApiService.get("/protected", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.status === 200;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
};
