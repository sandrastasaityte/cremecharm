import React from "react";
import { Navigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

const PrivateRoute = ({ children }) => {
  const { admin } = React.useContext(AdminContext);
  return admin ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
