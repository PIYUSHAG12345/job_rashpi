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
      title: "Platforms",
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-10">
      <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-16">
        Welcome to <span className="text-white">Arena</span>
      </h1>
      <div className="flex flex-wrap justify-center gap-10">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`relative p-6 w-80 bg-gradient-to-r ${card.color} text-white rounded-2xl shadow-2xl transition-transform transform hover:scale-105 hover:-translate-y-3`}
            onClick={() => navigate(card.link)}
            style={{ cursor: "pointer" }}
          >
            {/* Glass Effect */}
            <div className="absolute inset-0 rounded-2xl bg-white bg-opacity-10 blur-md"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold drop-shadow-lg">{card.title}</h2>
                <span className="text-4xl drop-shadow-lg">{card.icon}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed opacity-90">
                {card.description}
              </p>
              <div className="mt-6 text-right">
                <button
                  className="bg-white bg-opacity-20 text-sm font-semibold text-gray-100 py-2 px-5 rounded-full shadow-md backdrop-blur-sm hover:bg-opacity-40 focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the card's onClick
                    navigate(card.link);
                  }}
                >
                  Explore
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Arena;
