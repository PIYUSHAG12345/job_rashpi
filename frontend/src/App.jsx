import React from "react";
// import { BrowserRouter } from "react-router-dom";
import AppRoutes from './routes.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Arena from "./components/Pages/Arena.jsx";
import { Navigate } from "react-router-dom";
const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        
      
        <Route
          path="/arena"
          element={
            <PrivateRoute>
              <Arena />
            </PrivateRoute>
          }
        />

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  </AuthProvider>
  );
};

export default App;
