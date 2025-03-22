import express from "express"; // Use 'import' for express
import axios from "axios"; // Use 'import' for axios
import cors from "cors"; // Use 'import' for cors
import { config } from "dotenv"; // Use 'import' for dotenv
import app from "./app.js"; // Your custom app module
import Company from './router/companies.js';

// Load environment variables
config();

// Middleware setup
app.use(cors());
app.use(express.json());

// LeetCode problems API endpoint
app.get("/api/problems", async (req, res) => {
  try {
    const response = await axios.get("https://leetcode.com/api/problems/all/");
    const problems = response.data.stat_status_pairs.map((problem) => ({
      id: problem.stat.frontend_question_id,
      title: problem.stat.question__title,
      difficulty:
        problem.difficulty.level === 1
          ? "Easy"
          : problem.difficulty.level === 2
          ? "Medium"
          : "Hard",
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
app.use('/api/companies', Company);
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
}).on("error", (err) => {
  console.error("Server Error:", err);
});
