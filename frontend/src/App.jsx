import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login.jsx";
import Arena from "./components/Pages/Arena.jsx";
import AppRoutes from "./routes.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
      <Router>
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <AppRoutes></AppRoutes>
      </Router>
  );
};

export default App;
