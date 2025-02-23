import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

// Function to generate Access Token
const generateAccessToken = (user) => {
  return jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

// Function to generate Refresh Token
const generateRefreshToken = (user) => {
  return jwt.sign({ email: user.email}, process.env.REFRESH_SECRET, { expiresIn: "7d" });
};

// Register a new user
export const register = async (req, res) => {
  
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login and issue token
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email});
    if (!user) return res.status(401).json({ message: "Invalid credentials." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials." });

    // Generate token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Refresh Access Token
export const refreshToken = async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);

    const user = await User.findOne({ refreshToken: token });
    if (!user) return res.status(403).json({ message: "Invalid Refresh Token" });

    const newAccessToken = generateAccessToken(user);

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid Refresh Token" });
  }
};

// Logout (delete Refresh Token)
export const logout = async (req, res) => {
  const { token } = req.body;

  try {
    await User.findOneAndUpdate({ refreshToken: token }, { refreshToken: null });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
