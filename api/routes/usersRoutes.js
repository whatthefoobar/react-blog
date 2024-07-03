import express from "express";
const router = express.Router();

import {
  loginUser,
  logoutUser,
  registerUser,
  getUserById,
  deleteUser,
  updateUser,
  getAllUsers,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

///api/users
router.get("/", getAllUsers); //works
router.post("/register", registerUser); //works
router.post("/login", loginUser); //works
router.post("/logout", logoutUser); //works
router
  .route("/:id")
  .delete(protect, deleteUser)
  .get(protect, getUserById) // works
  .put(protect, updateUser);

export default router;
