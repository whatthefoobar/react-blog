import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  loginUser,
  logoutUser,
  registerUser,
  getUserById,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

///api/users
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router
  .route("/:id")
  .delete(protect, deleteUser)
  .get(protect, getUserById)
  .put(protect, updateUser);

export default router;
