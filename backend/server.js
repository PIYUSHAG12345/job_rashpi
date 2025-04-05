import express from "express"; 
import axios from "axios"; 
import cors from "cors"; 
import multer from "multer"; 
import { config } from "dotenv"; 
import app from "./app.js"; 
import Experience from "./models/ExperienceSchema.js";
import User from "./models/userSchema.js";
import router from "./router/userRouter.js";
import passport from "passport"; 
import session from "express-session";
import passportConfig from "./passport.js";
import OpenAI from "openai/index.mjs";
import jwt from "jsonwebtoken"

config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware setup
app.use(
  cors({
    origin: "https://job-rashpi-2-frontend.onrender.com", // Allow your frontend URL
    credentials: true, // Allow cookies to be sent
  })
);

app.use(express.json());

// Session configuration
app.use(
  session({
    secret: process.env.JWT_SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      sameSite: "Lax", // For cross-site cookie handling
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    },
  })
);

// Initialize passport
passportConfig();
app.use(passport.initialize());
app.use(passport.session());

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

// Experience Management Endpoints
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

// Google OAuth Routes
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));


app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/login" }),
  (req, res) => {
    if (!req.user) {
      return res.status(401).send("Authentication failed");
    }

    // Sign the JWT with user ID
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Set JWT as a cookie
    res.cookie("token", token, {
      httpOnly: true, // More secure
      secure: false, // Change to `true` in production (HTTPS)
      sameSite: "Lax",
      domain : "localhost",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.cookie("isLoggedIn", true, {
      httpOnly: false,  // so frontend JS can access it
      secure: false,
      sameSite: "Lax",
      domain: "localhost",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    
    res.redirect("http://localhost:5173/arena");
    
    // Set isLoggedIn as a cookie (not httpOnly so frontend can access it

   // res.redirect("http://localhost:5173/arena?isLoggedIn=true");
  }
);



// Logout Route
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error during logout:", err);
      return res.status(500).send("Logout failed");
    }
    req.session.destroy(() => {
      res.clearCookie("token");
      res.redirect("http://localhost:5173/");
    });
  });
});

export default app;
