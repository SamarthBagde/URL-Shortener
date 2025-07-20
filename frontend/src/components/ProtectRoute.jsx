import { Children, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const authUser = async () => {
  try {
    const res = await axios.get("/user/auth-check", {
      withCredentials: true,
    });

    return res;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const ProtectRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await authUser();

      if (res.status === 200 && res.data) {
        setUser(res.data.user);
        setIsAuth(res.data.authenticated);
      } else {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) {
    return <p>Loading - Protected Route</p>;
  }
  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default ProtectRoute;
