import express from "express";
import { getOrders, createOrder, userOrders, cancelOrder, updateStatus } from "../controllers/orderController.js";
import protect from "../middleware/authMiddleware.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// 🔐 Only admin can see orders
router.get("/", protect, getOrders);

// User order creation
router.post("/", authMiddleware, createOrder);

// Fetch user orders
router.post("/userorders", authMiddleware, userOrders);

// Cancel user order
router.post("/cancel", authMiddleware, cancelOrder);
// Update order status (for admin)
router.post("/status", protect, updateStatus);

export default router;