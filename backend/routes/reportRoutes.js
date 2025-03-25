import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { generateMonthlyReport } from "../controllers/reportController.js";

const router = express.Router();

// Generate and send monthly expense report via email
router.get("/monthly", isAuthenticated, generateMonthlyReport);

export default router;
