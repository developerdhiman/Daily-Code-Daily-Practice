import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";

const PrivateRoute = ({ children }) => {
    const {user} = useContext(AuthContext);

  if (user) {
    return children;
  }

  return <Navigate to="/signin"></Navigate>;
};

export default PrivateRoute;
