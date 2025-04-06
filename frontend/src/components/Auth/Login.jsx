import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/user/login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setUser(response.data.user);
      console.log("Login successful:", response.data);
      navigate("/arena");
    } catch (error) {
      console.error(error.response?.data?.message || "Login failed");
      alert(error.response?.data?.message || "Invalid credentials");
    }
  };

  // Google Login Redirect Function
 // Google Login Redirect Function
 const handleGoogleLogin = () => {
  try {
    // Redirect user to backend Google OAuth endpoint
    window.location.href = "http://localhost:4000/auth/google/";
  } catch (err) {
    console.error("Error during Google login:", err);
  }
};

// Function to check for login after redirectio



  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <hr />

        {/* Google Login Button */}
        <button onClick={handleGoogleLogin} className="google-login-btn">
  Login with Google
</button>

      </form>
    </div>
  );
};

export default Login;
