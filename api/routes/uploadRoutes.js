import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

//stored on the server
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpg|jpeg|png|webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter,
});
const uploadSingleImage = upload.single("file");

// Upload endpoint

router.post("/", (req, res) => {
  uploadSingleImage(req, res, function (err) {
    // console.log("req.file:", req.file); // Log the req.file object

    if (!req.file) {
      console.error("No file received");
      return res.status(400).send({ message: "No file uploaded" });
    }
    if (err) {
      console.error("Multer error:", err);
      return res.status(400).send({ message: err.message });
    }

    res.status(200).send({
      message: "Image uploaded successfully",
      image: `${req.file.path}`,
    });
  });
});

export default router;
