import dotenv from "dotenv";
import express from "express";
import cors  from "cors";
import connectDB from "./config/db.js";
import dataRoutes from "./routes/dataRoutes.js";
import authRoutes from "./routes/authRoutes.js"; 
import logRequest from "./middlewares/logMiddleware.js"; 
import errorHandler from "./middlewares/errorHandler.js"; 


dotenv.config();
connectDB(); 

const app = express();
// Add the logRequest middleware globally
app.use(logRequest); 


// Middleware
app.use(cors());
app.use(express.json());


// Simple Route
app.get("/", (req, res) => {
  res.send("Test");
});

app.use('/auth', authRoutes);
// Use /api/data routes
app.use('/api/data', dataRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
