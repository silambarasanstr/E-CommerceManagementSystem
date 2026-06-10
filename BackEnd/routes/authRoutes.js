import express from "express";
import {
  registerUser,
  loginUser,
  getDashboard,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/dashboard", authMiddleware, getDashboard);

export default router;
