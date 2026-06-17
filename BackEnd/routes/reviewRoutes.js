import express from "express";
import {
  addReview,
  getProductReviews,
  deleteReview,
} from "../controllers/reviewController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/:id/reviews", getProductReviews);

// Protected
router.post("/:id/reviews", authMiddleware, addReview);
router.delete("/reviews/:id", authMiddleware, deleteReview);

export default router;
