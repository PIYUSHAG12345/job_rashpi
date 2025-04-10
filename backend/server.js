import express from "express";
import axios from "axios";
import cors from "cors";
import multer from "multer";
import { config } from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import OpenAI from "openai/index.mjs";
import Experience from "./models/ExperienceSchema.js";
import User from "./models/userSchema.js";
import userRouter from "./router/userRouter.js";
import passportConfig from "./passport.js";
import { dbConnection } from "./database/dbConnection.js";

// Load environment variables
config({ path: "./config/.env" });

const app = express();

// Connect to MongoDB
dbConnection();

// OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://job-rashpi-5.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Session
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);

// Passport
passportConfig();
app.use(passport.initialize());
app.use(passport.session());

// LeetCode API
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

// Experience CRUD
app.post("/user/experiences", async (req, res) => {
  try {
    const newExperience = new Experience(req.body);
    await newExperience.save();
    res.status(201).json(newExperience);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/user/experiences", async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/user/experiences/:id", async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.json({ message: "Experience deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting experience" });
  }
});

// Auth Status route
app.get("/auth/status", (req, res) => {
  const token = req.cookies.token;
  res.json({
    isLoggedIn: !!token,
    token,
  });
});

// Google OAuth
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "https://job-rashpi-5.onrender.com/login" }),
  (req, res) => {
    if (!req.user) return res.status(401).send("Authentication failed");

    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("isLoggedIn", true, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect("https://job-rashpi-5.onrender.com/arena");
  }
);

// Logout
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).send("Logout failed");
    }
    req.session.destroy(() => {
      res.clearCookie("token");
      res.redirect("https://job-rashpi-5.onrender.com/");
    });
  });
});


app.get('/arena', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'arena.html'));
});

// User routes
app.use("/user", userRouter);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
