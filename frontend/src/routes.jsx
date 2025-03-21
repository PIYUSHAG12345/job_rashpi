import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/home";
import About from "./components/Pages/About";
import Contact from "./components/Pages/Contact";
import Error404 from "./components/Pages/Error404";
import Arena from "./components/Pages/Arena";
import QuestionsPage from "./components/Pages/Platforms/Questions";
import ResumeBuilder from "./components/Pages/ResumeBuilder";
import PlatformList from "./components/Pages/Platforms/PlatformList";
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/arena" element={<Arena/>}/>
    <Route path="*" element={<Error404 />} />
    <Route path="/questions" element={<QuestionsPage/>}/>
    <Route path="/resumebuilder" element={<ResumeBuilder/>}/>
    <Route path="/platformlist" element={<PlatformList/>}/>
    <Route path="/platform/QuestionsPage" element={<QuestionsPage />} />

  </Routes>
);

export default AppRoutes;
