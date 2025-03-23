import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for button
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true); // Start loading indicator
    try {
      const response = await axios.post("http://localhost:4000/user/register", {
        name,
        email,
        password,
      });
      toast.success("Registration successful!"); // Notify user
      navigate("/arena"); // Redirect to Arena page

      console.log(response.data); // Optional: Log the response for debugging
    } catch (error) {
      console.error(error.response?.data?.message || "Error during registration");
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <button
            type="submit"
            className="register-btn"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
