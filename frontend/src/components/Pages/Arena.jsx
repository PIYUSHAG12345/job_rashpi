import React from "react";
import { useNavigate } from "react-router-dom";
import "./arena.css";

const Arena = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Resources",
      description: "Study materials, notes, and guides await you.",
      link: "/resources",
      icon: "📚",
    },
    {
      title: "Platforms",
      description: "Mock tests and practice questions for better prep.",
      link: "/platformlist",
      icon: "❓",
    },
    {
      title: "Company Profiles",
      description: "Explore top companies and their hiring insights.",
      link: "/companiespage",
      icon: "🏢",
    },
    {
      title: "Resume Builder",
      description: "Create and design your professional resume here.",
      link: "/resumebuilder",
      icon: "📝",
    },
  ];

 const handleLogout = () => {
  // Expire token and isLoggedIn cookies by setting past expiry
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Clear from localStorage (if also saved there)
  localStorage.removeItem("token");
  localStorage.removeItem("isLoggedIn");

  // Navigate to home or login
  navigate("/");
};


  return (
    <div className="arena-container">
      <header className="arena-header">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <h1 className="arena-title">
        Welcome to the <span>Arena</span>
      </h1>
      <div className="arena-grid">
        {sections.map((section, index) => (
          <div
            key={index}
            className="arena-tile"
            onClick={() => navigate(section.link)}
          >
            <div className="tile-glow"></div>
            <div className="tile-content">
              <span className="tile-icon">{section.icon}</span>
              <h2>{section.title}</h2>
              <p>{section.description}</p>
            </div>
          </div>
        ))}
      </div>
      <footer className="arena-footer">
        Explore more and level up your skills!
      </footer>
    </div>
  );
};

export default Arena;
