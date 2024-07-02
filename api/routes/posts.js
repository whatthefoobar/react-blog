import express from "express";
const router = express.Router();

import {
  createPost,
  updatePost,
  deletePost,
  getPostById,
  getAllPosts,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMidleware.js";

// @route /api/posts
router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);
router.get("/:id", getPostById);
router.get("/", getAllPosts);

export default router;
