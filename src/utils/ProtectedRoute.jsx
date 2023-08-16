import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ to, isAllowed, children }) => {
  if (!isAllowed) return <Navigate to={to} />;

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
