import express from "express";
const router = express.Router();

import {
  createCategory,
  getAllCategories,
} from "../controllers/categoryController.js";
import { protect } from "../middleware/authMiddleware.js";

// @route   POST /api/categories
router.post("/", protect, createCategory);
router.get("/", getAllCategories);

export default router;
