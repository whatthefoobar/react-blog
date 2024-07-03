import asyncHandler from "../middleware/asyncHandler.js";
import Post from "../models/Post.js";

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  console.log("req.originalUrl", req.originalUrl);
  console.log("Create Post Request Body:", req.body);
  const newPost = new Post({ ...req.body, username: req.user.username });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error("Error saving post:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.user.username || req.user.isAdmin) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500);
        throw new Error(err.message);
      }
    } else {
      res.status(401);
      throw new Error(
        "You can only update your own post or you need to be an admin!"
      );
    }
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error("Post not found");
    }

    if (post.username === req.user.username || req.user.isAdmin) {
      await Post.deleteOne({ _id: post._id });
      res.status(200).json("Post has been deleted...");
    } else {
      res.status(401);
      throw new Error(
        "You can only delete your own post or you need to be an admin!"
      );
    }
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Get a post by ID
// @route   GET /api/posts/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(404);
    throw new Error("Post not found.");
  }
});

// @desc    Get all posts or filter by user/category
// @route   GET /api/posts
// @access  Public
const getAllPosts = asyncHandler(async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

export { createPost, updatePost, deletePost, getPostById, getAllPosts };
