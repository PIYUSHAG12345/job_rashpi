import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Correctly calls the custom hook

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
