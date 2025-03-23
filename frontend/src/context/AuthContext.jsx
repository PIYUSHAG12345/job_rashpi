import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    const userData = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const userData = JSON.parse(atob(token.split(".")[1])); // Decode JWT
      setUser(userData);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
