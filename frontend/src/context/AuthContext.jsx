import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user from localStorage if available
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  // Fetch user from localStorage on app load
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser)); // Set user from localStorage
  //   }
  // }, []);



  // Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:4000/user/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data)); // ✅ Save user in localStorage
      setUser(res.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user"); // ✅ Remove user from localStorage
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);