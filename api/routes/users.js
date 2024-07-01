// const router = require('express').Router();

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
// import User from "../models/User.js";
// import Post from "../models/Post.js";
// import { genSalt, hash } from "bcrypt";

///api/users
// rewrite register:
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router
  .route("/:id")
  .delete(protect, deleteUser)
  .get(protect, getUserById)
  .put(protect, updateUser);

// //UPDATE
// router.put("/:id", async (req, res) => {
//   if (req.body.userId === req.params.id) {
//     if (req.body.password) {
//       const salt = await genSalt(10);
//       req.body.password = await hash(req.body.password, salt);
//     }
//     try {
//       const updatedUser = await User.findByIdAndUpdate(
//         req.params.id,
//         {
//           $set: req.body,
//         },
//         { new: true }
//       );
//       res.status(200).json(updatedUser);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(401).json("You can only update your account!");
//   }
// });

// //DELETE
// router.delete("/:id", async (req, res) => {
//   if (req.body.userId === req.params.id) {
//     try {
//       const user = await User.findById(req.params.id);
//       try {
//         await Post.deleteMany({ username: user.username });
//         await User.findByIdAndDelete(req.params.id);
//         res.status(200).json("User has been deleted...");
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     } catch (err) {
//       res.status(404).json("User not found!");
//     }
//   } else {
//     res.status(401).json("You can only delete your account!");
//   }
// });

// //GET USER
// router.get("/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     const { password, ...others } = user._doc;
//     res.status(200).json(others);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

export default router;
