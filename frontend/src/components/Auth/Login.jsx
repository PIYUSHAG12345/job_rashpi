import { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log(token); // Logs token only once
      navigate("/arena", { replace: true }); // Navigate without history stacking
    }
  }, [navigate]); // Dependency on navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await axios.post("http://localhost:4000/user/login", {
        email,
        password,
      });

      // Save token to localStorage
      const { token } = response.data;
      localStorage.setItem("token", token);

      console.log("Login successful:", response.data, token);
      navigate("/arena"); // Redirect to Arena on success
    } catch (error) {
      console.error(error.response?.data?.message || "Login failed");
      alert(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false); // Stop loading
    }
  };

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
      </form>
    </div>
  );
};

export default Login;
