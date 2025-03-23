import React from "react";
import "./Resources.css"; // Ensure correct relative path

const resources = [
  {
    id: 1,
    title: "Data Structures & Algorithms Playlist",
    description: "A complete playlist covering DSA concepts with coding problems.",
    link: "https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz",
    image: "https://hematechnoworld.in/wp-content/uploads/2023/11/Untitled-design-1.png"
  },
  {
    id: 2,
    title: "Full Stack Web Development",
    description: "Learn MERN stack with this step-by-step playlist.",
    link: "https://www.youtube.com/playlist?list=PLDzeHZWIZsTo0wSBcg4-NMIbC0L8evLrD",
    image: "https://jessup.edu/wp-content/uploads/2024/01/Is-Web-Development-Oversaturated.jpg"
  },
  {
    id: 3,
    title: "GeeksforGeeks - DSA Guide",
    description: "A structured guide to master Data Structures and Algorithms.",
    link: "https://www.geeksforgeeks.org/data-structures/",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg"
  },
  {
    id: 4,
    title: "LeetCode Coding Practice",
    description: "Solve coding problems and improve your skills on LeetCode.",
    link: "https://leetcode.com/",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
  }
];

const ResourcesPage = () => {
  return (
    <div className="container">
      <h1 className="title">Resources</h1>
      <div className="card-container">
        {resources.map((resource) => (
          <div className="card" key={resource.id}>
            <img src={resource.image} alt={resource.title} className="card-image" />
            <h2 className="card-title">{resource.title}</h2>
            <p className="card-description">{resource.description}</p>
            <a href={resource.link} target="_blank" rel="noopener noreferrer" className="card-link">
              Visit Resource
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesPage;