import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import {
  getNotifications,
  markAsRead,
} from "../controllers/notificationController.js";

const router = express.Router();

// Get all notifications
router.get("/", isAuthenticated, getNotifications);

// Mark a notification as read
router.put("/:id/read", isAuthenticated, markAsRead);

export default router;
