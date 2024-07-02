import { useState } from "react";
import axios from "axios";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [badData, setBadData] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [match, setMatch] = useState(false);

  const login = async (email, password) => {
    setLoading(true);

    if (!email || !password) {
      setError(true);
      setLoading(false);
      return;
    }

    setError(false);

    const loginBody = { email, password };

    try {
      const res = await axios.post("http://localhost:3000/users", loginBody);

      if (res.status === 200) {
        setBadData(false);
        // cookies.set("jwt_token", res.data.jwt_token);
        // localStorage.setItem("jwt_refresh_token", res.data.jwt_refresh_token);
        // router.push("/");
      }

      console.log("response:", res);
    } catch (err) {
      setBadData(true);
      console.log("err:", err);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (name, email, password, confirmPassword) => {
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setError(true);
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMatch(true);
      setLoading(false);
      return;
    }

    setError(false);
    setMatch(false);

    const signUpBody = { name, email, password };

    try {
      const res = await axios.post(
        `${process.env.SERVER_URL}/users/sign_up`,
        signUpBody
      );

      if (res.status === 201) {
        setBadData(false);
        cookies.set("jwt_token", res.data.jwt_token);
        localStorage.setItem("jwt_refresh_token", res.data.jwt_refresh_token);
        router.push("/");
      }

      console.log("response:", res);
    } catch (err) {
      setBadData(true);
      if (err.response?.data?.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred");
      }
      console.log("err:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    badData,
    errorMessage,
    match,
    login,
    signUp,
  };
};

export default useAuth;
