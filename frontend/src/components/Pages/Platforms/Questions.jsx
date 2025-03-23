import React, { useState, useEffect } from "react";
import axios from "axios";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [difficultyFilter, setDifficultyFilter] = useState("All"); // New state for filter

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/problems");
        setQuestions(response.data.reverse());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  // Filter questions based on search input and difficulty filter
  const filteredQuestions = questions.filter((question) => {
    const matchesSearch = question.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "All" || question.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  if (loading) {
    return (
      <div style={styles.loading}>
        <h2>Loading questions...</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>LeetCode Questions</h1>
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.searchInput}
      />
      <select
        value={difficultyFilter}
        onChange={(e) => setDifficultyFilter(e.target.value)}
        style={styles.filterSelect}
      >
        <option value="All">All</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      <div style={styles.tableContainer}>
        {filteredQuestions.map((question) => (
          <div key={question.id} style={styles.card}>
            <div style={styles.cardContent}>
              <div style={styles.cardRow}>
                <strong>ID:</strong> {question.id}
              </div>
              <div style={styles.cardRow}>
                <strong>Title:</strong> {question.title}
              </div>
              <div style={styles.cardRow}>
                <strong>Difficulty:</strong>{" "}
                <span
                  style={{
                    ...styles.difficultyBadge,
                    backgroundColor:
                      question.difficulty === "Easy"
                        ? "#4caf50"
                        : question.difficulty === "Medium"
                        ? "#ff9800"
                        : "#f44336",
                  }}
                >
                  {question.difficulty}
                </span>
              </div>
              <div style={styles.cardRow}>
                <strong>Paid Only:</strong>{" "}
                {question.paid_only ? "Yes" : "No"}
              </div>
              <div style={styles.cardRow}>
                <a
                  href={question.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  Open
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f3f4f6",
    minHeight: "100vh",
    fontFamily: "'Arial', sans-serif",
  },
  title: {
    fontSize: "2.5rem",
    color: "#333",
    textAlign: "center",
    marginBottom: "20px",
  },
  searchInput: {
    display: "block",
    margin: "0 auto 10px",
    padding: "10px",
    width: "50%",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  filterSelect: {
    display: "block",
    margin: "0 auto 20px",
    padding: "10px",
    width: "50%",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    backgroundColor: "#fff",
  },
  tableContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    width: "300px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  cardContent: {
    textAlign: "left",
  },
  cardRow: {
    marginBottom: "10px",
    fontSize: "1rem",
    color: "#555",
  },
  difficultyBadge: {
    color: "#fff",
    padding: "4px 8px",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "0.9rem",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "1rem",
    marginTop: "10px",
    display: "inline-block",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f3f4f6",
    fontSize: "1.5rem",
    color: "#333",
  },
};

export default QuestionsPage;
