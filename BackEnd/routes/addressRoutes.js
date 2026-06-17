import express from "express";
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../controllers/addressController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// All address routes are protected
router.use(authMiddleware);

router.get("/", getAddresses);
router.post("/", addAddress);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);
router.put("/:id/set-default", setDefaultAddress);

export default router;
