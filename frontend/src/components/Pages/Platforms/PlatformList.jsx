import React from "react";
import { Link } from "react-router-dom";

const platforms = [
  { id: 1, name: "LeetCode", path: "QuestionsPage" },
  { id: 2, name: "Codeforces", path: "CodeforcesAPI" },
  { id: 3, name: "Contests", path: "ContestsWithLinks" },
];

const PlatformList = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Explore Platforms</h1>
      <div style={styles.cardContainer}>
        {platforms.map((platform) => (
          <div key={platform.id} style={styles.card}>
            <Link to={`/platform/${platform.path}`} style={styles.cardLink}>
              <h2 style={styles.cardTitle}>{platform.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
    background: "linear-gradient(135deg, #1f4037, #99f2c8)", // Gradient background
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: "3rem",
    color: "#ffffff",
    marginBottom: "40px",
    fontWeight: "bold",
    textShadow: "0px 3px 6px rgba(0, 0, 0, 0.3)",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    width: "80%",
  },
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.3)",
  },
  cardLink: {
    textDecoration: "none",
    color: "#333",
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#333",
  },
};

export default PlatformList;
