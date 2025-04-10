import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ element }) => {
  console.log("sahi ja raha hai");
  const { user } = useContext(AuthContext);

    const storedLogin = window.localStorage.getItem('isLoggedIn');
    const isLoggedIn = document.cookie
    .split('; ')
    .find(row => row.startsWith('isLoggedIn'))
    ?.split('=')[1];
    const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('token'))
    ?.split('=')[1];

  if (user || isLoggedIn || token) {
    console.log("✅ Access granted - Logged in");
    return element;
  }
   if(!user) console.error("user not found");
  else console.error("isLoggedIn not found in localStorage");
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
