import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import categoryRoute from "./routes/categories.js";
import uploadRoute from "./routes/upload.js";
import multer from "multer";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/upload", uploadRoute);

// for deplayment
// if (process.env.NODE_ENV === "production") {
//   const __dirname = path.resolve();
//   app.use("/images", express.static("/var/data/images"));
//   app.use(express.static(path.join(__dirname, "/client/build")));
//   // if in production the frontend build is served from the published backend
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//   );
// } else {
//   const __dirname = path.resolve();
//   app.use("/images", express.static(path.join(__dirname, "/images")));
//   app.get("/", (req, res) => {
//     res.send("API is running....");
//   });
// }

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  // Serve static images from the specified directory in production
  app.use("/images", express.static(path.join(__dirname, "/var/data/images")));
  app.use(express.static(path.join(__dirname, "/client/build")));
  // Other production routes
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  const __dirname = path.resolve();
  // Serve static images from the specified directory in development
  app.use("/images", express.static(path.join(__dirname, "/images")));
  // Other development routes
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

//
// app.get("/", (req, res) => {
//     res.send("API is running....");
// });

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port http://localhost:${port}`
  )
);
