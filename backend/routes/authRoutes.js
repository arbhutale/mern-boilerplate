import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { register, login } from "../controllers/authController.js";
import  { authenticateToken } from "../middleware/authMiddleware.js"
import User from "../models/User.js";
const router = express.Router();

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
    res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}`);
  }
);
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // exclude password
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Server error" });
  }
});

// Email/Password
router.post("/register", register);
router.post("/login", login);


export default router;
