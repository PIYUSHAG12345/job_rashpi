import express from "express";
import { register,login, getUser} from "../controller/userController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import User from "../models/userSchema.js";
import passport from "passport";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.get("/get",isAuthenticated, getUser)
// Google Login Route
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
      const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
  
      res.redirect(`http://localhost:5173/arena?token=${token}`);
    }
  );

export default router;

