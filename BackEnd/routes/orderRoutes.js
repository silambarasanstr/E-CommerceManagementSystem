import express from "express";
import {
  placeOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

// User routes — login required
router.post("/", authMiddleware, placeOrder);
router.get("/", authMiddleware, getMyOrders);
router.get("/:id", authMiddleware, getOrderById);
router.put("/:id/cancel", authMiddleware, cancelOrder);

// Admin routes — login + admin role required
router.get("/admin/all", authMiddleware, adminMiddleware, getAllOrders);
router.put("/admin/:id/status", authMiddleware, adminMiddleware, updateOrderStatus);

export default router;
