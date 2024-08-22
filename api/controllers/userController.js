import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import User from "../models/User.js";

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc   Login user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  // console.log("req.originalUrl:", req.originalUrl);

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      image: user.image,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

//get user details

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (req.user.isAdmin || req.user._id.toString() === user._id.toString()) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      if (req.body.image) {
        user.image = req.body.image; // Ensure this line exists and works
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        image: updatedUser.image,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(403);
      throw new Error("You are not authorized to update this user");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//not used but works
// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  if (!req.user.isAdmin) {
    res.status(403);
    throw new Error("You are not authorized to delete this user");
  }

  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "User has been deleted" });
});

// @desc    Get user
// @route   GET /api/users/:id
// @access  Private
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//not used but works
// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    const usersWithoutPasswords = users.map((user) => {
      const { password, ...others } = user._doc;
      return others;
    });
    res.status(200).json(usersWithoutPasswords);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
};
