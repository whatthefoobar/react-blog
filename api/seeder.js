import mongoose from "mongoose";
import dotenv from "dotenv";
import posts from "./data/posts.js";
import users from "./data/users.js";
import categories from "./data/categories.js";
import Post from "./models/Post.js";
import User from "./models/User.js";
import Category from "./models/Category.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Post.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();

    const sampleCategories = await Category.insertMany(categories);
    const createdUsers = await User.insertMany(users);
    const sampleBlogPosts = await Post.insertMany(posts);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Post.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

// seed with node api/seeder.js / node api/seeder.js -d
