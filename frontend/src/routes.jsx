import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/home";
import About from "./components/Pages/About";
import Contact from "./components/Pages/Contact";
import Error404 from "./components/Pages/Error404";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="*" element={<Error404 />} />
  </Routes>
);

export default AppRoutes;
