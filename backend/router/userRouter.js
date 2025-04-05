import express from "express";
import { register,login, getUser, getGoogleUser} from "../controller/userController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import User from "../models/userSchema.js";
import passport from "passport";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.get("/get",isAuthenticated, getUser)
router.get("/guser",getGoogleUser)
// Google Login Route



export default router;

