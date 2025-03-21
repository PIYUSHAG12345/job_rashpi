require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// API endpoint to fetch all problems from LeetCode
app.get("/api/problems", async (req, res) => {
  try {
    const response = await axios.get("https://leetcode.com/api/problems/all/");
    const problems = response.data.stat_status_pairs.map((problem) => ({
      id: problem.stat.frontend_question_id,
      title: problem.stat.question__title,
      difficulty: problem.difficulty.level === 1 ? "Easy" : problem.difficulty.level === 2 ? "Medium" : "Hard",
      url: `https://leetcode.com/problems/${problem.stat.question__title_slug}/`,
      paid_only: problem.paid_only,
    }));
    res.status(200).json(problems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch problems from LeetCode API." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
