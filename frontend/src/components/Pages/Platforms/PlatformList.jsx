import React from "react";
import { Link } from "react-router-dom";

const platforms = [
  { id: 1, name: "leetcode",path:"QuestionsPage" },
  { id: 2, name: "Codeforces",path:"CodeforcesAPI" },
  { id: 3, name: "Contests",path:"ContestsWithLinks" },
  { id: 4, name: "GeeksforGeeks" },
  { id: 5, name: "HackerEarth" },
];

const PlatformList = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Explore Platforms</h1>
      <ul style={styles.list}>
        {platforms.map((platform) => (
          <li key={platform.id} style={styles.listItem}>
            {/* Updated the link to navigate correctly */}
            <Link to={`/platform/${platform.path}`} style={styles.link}>
              {platform.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    margin: "10px 0",
  },
  link: {
    fontSize: "1.2rem",
    color: "#007bff",
    textDecoration: "none",
  },
  linkHover: {
    textDecoration: "underline",
  },
};

export default PlatformList;
