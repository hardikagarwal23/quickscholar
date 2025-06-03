import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './config/mongoDB.js';
import authRoute from './routes/authRoute.js';
import profileRoute from './routes/ProfileRoute.js';

import allScholarshipRoute from './routes/all-scholarships.js';
import authUser from "./middleware/authUser.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

const startServer = async () => {
  try {
    await connectDB();
    app.get("/", (req,res) => {
    res.send("QuickScholar Backend is running.");
    });
    app.use("/api/all-scholarships", authUser,allScholarshipRoute);
    app.use("/api/auth", authRoute);
    app.use("/api/profile", authUser,profileRoute);

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();
