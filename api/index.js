import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import categoryRoute from "./routes/categories.js";
import multer, { diskStorage } from "multer";
import path from "path";
import connectDB from "./config/db.js";

const app = express();
dotenv.config();

app.use(express.json());
const corsOptions = {
  origin: ["http://localhost:5000"], // Allow requests from this origin "https://react-blog-1s9g.onrender.com/",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow specified HTTP methods
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 204, // Respond with a 204 No Content status for preflight requests
};

app.use(cors(corsOptions));

// const __dirname = path.resolve();
// app.use("/images", express.static(path.join(__dirname, "/images")));

connectDB();

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

// app.get("/", (req, res) => {
//   res.send("API is running....");
// });

const __dirname = path.resolve();
app.use("/images", express.static(path.join(__dirname, "/images")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
