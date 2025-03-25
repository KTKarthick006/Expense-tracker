import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import {
  createTransaction,
  getTransactions,
} from "../controllers/transactionController.js";

const router = express.Router();

// Create a transaction (Payment/Refund)
router.post("/create", isAuthenticated, createTransaction);

// Get all transactions for the user
router.get("/", isAuthenticated, getTransactions);

export default router;
