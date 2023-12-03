import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../hooks/AuthContextProvider";
import { useContext } from "react";

import Loader from "../pages/Loader";

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ children }) {
  const { pathname } = useLocation();
  const { user, loginChecking } = useContext(AuthContext);
  if (loginChecking & !user) {
    return <Loader />;
  }
  if (!user) {
    return <Navigate to={"/login"} replace={true} state={{ path: pathname }} />;
  }
  return children;
}
