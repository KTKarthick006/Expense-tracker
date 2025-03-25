import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
} from "../controllers/budgetController.js";

const router = express.Router();

// Create a budget
router.post("/create", isAuthenticated, createBudget);

// Get all budgets for the user
router.get("/", isAuthenticated, getBudgets);

// Update a budget
router.put("/:id", isAuthenticated, updateBudget);

// Delete a budget
router.delete("/:id", isAuthenticated, deleteBudget);

export default router;
