import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

/**
 * Generate JWT
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

/**
 * COMMON COOKIE OPTIONS
 * (Vercel frontend + Render backend)
 */
const cookieOptions = {
  httpOnly: true,
  secure: true,        // REQUIRED (HTTPS)
  sameSite: "none",    // REQUIRED (cross-origin)
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
};


// ===============================
// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
// ===============================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = generateToken(user._id);

    // ✅ Set auth cookie
    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ===============================
// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
// ===============================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    // ✅ Set auth cookie
    res.cookie("token", token, cookieOptions);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ===============================
// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Public
// ===============================
router.post("/logout", (req, res) => {
  res.cookie("token", "", {
    ...cookieOptions,
    expires: new Date(0),
  });

  res.json({ message: "Logged out successfully" });
});


// ===============================
// @route   GET /api/auth/me
// @desc    Get logged-in user
// @access  Private
// ===============================
router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (error) {
    res.status(401).json({ message: "Not authenticated" });
  }
});

export default router;
