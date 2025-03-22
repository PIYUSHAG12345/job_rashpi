import React, { useState, useEffect } from "react";
import axios from "axios";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/problems");
        setQuestions(response.data.reverse());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div>Loading questions...</div>;
  }

  return (
    <div>
      <h1>LeetCode Questions</h1>
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          display: "block",
          margin: "10px auto",
          padding: "8px",
          width: "50%",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Paid Only</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((question) => (
            <tr key={question.id}>
              <td>{question.id}</td>
              <td>{question.title}</td>
              <td>{question.difficulty}</td>
              <td>{question.paid_only ? "Yes" : "No"}</td>
              <td>
                <a href={question.url} target="_blank" rel="noopener noreferrer">
                  Open
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionsPage;
