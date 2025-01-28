import { createContext } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);
  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + "api/auth/is-auth");
      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserData = async () => {
    try {
      console.log("getting it", backendUrl);
      const { data } = await axios.get(backendUrl + "api/user/data");
      console.log("getUserData", data);

      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };
  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};

// import { createContext } from "react";
// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export const AppContext = createContext();

// export const AppContextProvider = (props) => {
//   const backendUrl =
//     (import.meta.env.VITE_BACKEND_URL || "http://localhost:4000").replace(
//       /\/+$/,
//       ""
//     ) + "/";
//   const [isLoggedin, setIsLoggedin] = useState(false);
//   const [userData, setUserData] = useState(false);

//   const getUserData = async () => {
//     try {
//       console.log("Fetching user data from:", `${backendUrl}api/user/data`);
//       const { data } = await axios.get(`${backendUrl}api/user/data`);
//       if (data.success) {
//         setUserData(data.userData);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   const value = {
//     backendUrl,
//     isLoggedin,
//     setIsLoggedin,
//     userData,
//     setUserData,
//     getUserData,
//   };
//   return (
//     <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
//   );
// };
