import express from "express"; // Use 'import' for express
import axios from "axios"; // Use 'import' for axios
import cors from "cors"; // Use 'import' for cors
import multer from "multer"; // Import multer for file uploads
import { config } from "dotenv"; // Use 'import' for dotenv
import app from "./app.js"; // Your custom app module
import Experience from "./models/ExperienceSchema.js";
import User from "./models/userSchema.js"

import router from "./router/userRouter.js";
import passport from "passport";
import session from "express-session";
import "./config/passport.js";
import OpenAI from "openai/index.mjs";
import Resume from "./models/resumeModel.js";
config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// Multer configuration
const storage = multer.memoryStorage();


const upload = multer({ storage }); // Create an upload instance

// Middleware setup
app.use(cors()); // Allow all origins
app.use(express.json());

app.use(session({
  secret: "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", // Change this to a secure secret key
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set secure: true in production
}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(
//     cors({
//       origin: "http://localhost:5174", // Allow requests from your frontend origin
//       methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
//       credentials: true, // Allow cookies or authentication headers
//     })
//   );

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
    //hello everyone
    res.status(200).json(problems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch problems from LeetCode API." });
  }
});



app.post('/user/experiences', async (req, res) => {
  try {
      const newExperience = new Experience(req.body);
      await newExperience.save();
      res.status(201).json(newExperience);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

app.get('/user/experiences', async (req, res) => {
  try {
      const experiences = await Experience.find();
      res.json(experiences);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

app.delete('/user/experiences/:id', async (req, res) => {
  try {
      const experience = await Experience.findByIdAndDelete(req.params.id);
      if (!experience) {
          return res.status(404).json({ message: 'Experience not found' });
      }
      res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting experience' });
  }
});

app.get("/auth/google", 
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Auth Callback
app.get("/auth/google/callback", 
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/login" }), 
  (req, res) => {
    res.redirect("http://localhost:5173/arena"); // Redirect after successful login
  }
);

// Logout Route
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.send("Logout failed");
    res.redirect("http://localhost:5173/");
  });
});


