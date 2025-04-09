import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login.jsx";
import Arena from "./components/Pages/Arena.jsx";
import AppRoutes from "./routes.jsx";
import { Toaster } from "react-hot-toast";
import Home from "./components/Pages/home.jsx";
import ProtectedRoute from "./components/PrivateRoute.jsx";
import QuestionsPage from "./components/Pages/Platforms/Questions.jsx";
import PlatformList from "./components/Pages/Platforms/PlatformList.jsx";
import ResumeBuilder from "./components/Pages/ResumeBuilder.jsx";
import CodeforcesAPI from "./components/Pages/Platforms/Codeforces.jsx";
import ContestsWithLinks from "./components/Pages/Platforms/Contests.jsx";
import ResourcesPage from "./components/Pages/Resources.jsx";
import CompaniesPage from "./components/Pages/CompaniesPage.jsx";
import Register from "./components/Auth/Signup.jsx";
import Experience from "./components/Pages/Experience.jsx";
import { useEffect } from "react";
import SetLoginFromURL from "../Setgooglelogin.jsx";
const App = () => {
  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   console.log("URL Params:", params.toString()); // Debugging

  //   if (params.get("isLoggedIn") === "true") {
  //     console.log("Setting isLoggedIn to localStorage"); // Debugging
  //     localStorage.setItem("isLoggedIn", "true");

  //     // ✅ Remove `isLoggedIn` from URL after storing it
  //     window.history.replaceState({}, document.title, window.location.pathname);
  //   }
  // }, []);
  <SetLoginFromURL />

  return (
      <Router>
        <Routes>
        {/* Protected Arena Route */}
        
        <Route path="/arena" element={<ProtectedRoute element={<Arena />} />} />
        <Route path="/questions" element={<ProtectedRoute element={<QuestionsPage/>}/>}/>
    <Route path="/resumebuilder" element={<ProtectedRoute element={<ResumeBuilder/>}/>}/>
    <Route path="/platformlist" element={<ProtectedRoute element={<PlatformList/>}/>}/>
    <Route path="/platform/QuestionsPage" element={<ProtectedRoute element={<QuestionsPage />} />}/>
    <Route path="/platform/CodeforcesAPI" element={<ProtectedRoute element={<CodeforcesAPI />} />}/>
    <Route path="/platform/ContestsWithLinks" element={<ProtectedRoute element={<ContestsWithLinks />} />}/>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<ProtectedRoute element={<ResourcesPage/>}/>}/>
        <Route path="/companiespage" element={<CompaniesPage />}/>
        <Route path="/register" element={<Register/>}/>
        <Route path = "/experience" element = {<Experience/>}/>
      </Routes>
      </Router>
  );
};

export default App;
