import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUserId } from "./auth";
//Protected routes to be secured, if there is no authenticated user navigate back to login
const Protected = ({ children }) => {
  const userId = getCurrentUserId();
  const location = useLocation();

  if (!userId) {
    return <Navigate to="/" state={{ from: location.pathname }} />;
  }

  return children;
};

export default Protected;
