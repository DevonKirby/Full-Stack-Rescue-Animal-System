import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import DogRoutes from "./routes/DogRoutes.js";
import MonkeyRoutes from "./routes/MonkeyRoutes.js";
import AdminRoutes from "./routes/AdminRoutes.js";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();

// Set up Express server
const app = express();
app.use(cors());
app.use(express.json());

// Set up routes
app.use("/api/dogs", DogRoutes);
app.use("/api/monkeys", MonkeyRoutes);
app.use("/api/admin", AdminRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB connection error:", err));

// Start the server
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});