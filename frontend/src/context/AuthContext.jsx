import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      // const params = new URLSearchParams(window.location.search);
      // if (params.get("isLoggedIn") === "true") {
      //   localStorage.setItem("isLoggedIn", "true");
      //   window.history.replaceState({}, document.title, window.location.pathname);
      // }

      const res = await axios.get("http://localhost:4000/user/get", {
        withCredentials: true, // Ensures cookies are sent
      });

      setUser(res.data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Export the custom hook correctly
export const useAuth = () => useContext(AuthContext);
export default AuthContext;
