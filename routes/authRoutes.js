import express from "express";
import { register, login, refreshToken, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register); // Đăng ký
router.post("/login", login); // Đăng nhập
router.post("/refresh-token", refreshToken); // Làm mới Access Token
router.post("/logout", logout); // Đăng xuất

export default router;
