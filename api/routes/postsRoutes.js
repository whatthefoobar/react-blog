import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  createPost,
  updatePost,
  deletePost,
  getPostById,
  getAllPosts,
} from "../controllers/postController.js";
import checkObjectId from "../middleware/checkObjectId.js";

router.route("/").get(getAllPosts).post(protect, createPost);

router
  .route("/:id")
  .get(checkObjectId, getPostById) //works
  .put(protect, checkObjectId, updatePost) //works
  .delete(protect, checkObjectId, deletePost); //works

export default router;
