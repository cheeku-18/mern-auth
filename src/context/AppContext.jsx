import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}api/auth/is-auth`, {
        withCredentials: true,
      });
      if (data.success) {
        setIsLoggedin(true);
        setUserData(data.user);
      }
    } catch (error) {
      console.error("Error checking auth state:", error);
      toast.error("Unauthorized. Please log in.");
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("Login successful!");
        setIsLoggedin(true);
        setUserData(data.user);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed.");
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    userData,
    login,
  };

  return <AppContent.Provider value={value}>{children}</AppContent.Provider>;
};
