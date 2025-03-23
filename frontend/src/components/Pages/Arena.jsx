import React from "react";
import { useNavigate } from "react-router-dom";

const Arena = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Resources",
      description: "Access study materials, notes, and guides.",
      link: "/resources",
      color: "from-blue-500 to-blue-700",
      icon: "📚",
    },
    {
      title: "platforms",
      description: "Practice previous year questions and mock tests.",
      link: "/platformlist",
      color: "from-green-500 to-green-700",
      icon: "❓",
    },
    {
      title: "Company Profile",
      description: "Learn about top companies and their hiring patterns.",
      link: "/companiespage",
      color: "from-yellow-500 to-yellow-600",
      icon: "🏢",
    },
    {
      title: "Resume Builder",
      description: "Create and customize your professional resume.",
      link: "/resumebuilder",
      color: "from-red-500 to-red-700",
      icon: "📝",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Welcome to <span className="text-blue-500">Arena</span>
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`p-6 w-80 bg-gradient-to-r ${card.color} text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2`}
            onClick={() => navigate(card.link)}
            style={{ cursor: "pointer" }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">{card.title}</h2>
              <span className="text-4xl">{card.icon}</span>
            </div>
            <p className="mt-4 text-sm">{card.description}</p>
            <div className="mt-6 text-right">
              <button
                className="bg-white text-sm font-medium text-gray-800 py-1 px-3 rounded-lg shadow hover:bg-gray-200"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the card's onClick
                  navigate(card.link);
                }}
              >
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Arena;
