import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import {
  addExpense,
  getExpenses,
  filterExpenses,
} from "../controllers/expenseController.js";

const router = express.Router();

// Add an expense
router.post("/add", isAuthenticated, addExpense);

// Get all expenses
router.get("/", isAuthenticated, getExpenses);

// Filter expenses by category or date range
router.get("/filter", isAuthenticated, filterExpenses);

export default router;
