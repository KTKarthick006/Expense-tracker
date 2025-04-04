import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";

import { connectDB } from "../config/db.js";
import sessionConfig from "../config/sessionConfig.js";

// Importing routes
import authRoutes from "../routes/authRoutes.js";
import expenseRoutes from "../routes/expenseRoutes.js";
import budgetRoutes from "../routes/budgetRoutes.js";
import notificationRoutes from "../routes/notificationRoutes.js";
import reportRoutes from "../routes/reportRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reports", reportRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to the Expense Tracker API!");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
