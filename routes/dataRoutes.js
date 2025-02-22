import express from "express";
import { postData, getData } from "../controllers/dataController.js"; 
import { authenticate, authorize } from "../middlewares/authMiddleware.js"; 


const router = express.Router();

// Define GET /api/data route
router.get("/", getData);

// Define POST /api/data route
router.post("/", authenticate, postData);

// Define POST /api/data route admin
router.post("/admin", authenticate,authorize(["admin"]), postData);

export default router; 
