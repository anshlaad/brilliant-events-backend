const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { uploadImage, getImagesByCategory } = require("../controllers/imageController");

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Upload route
router.post("/upload", upload.single("image"), uploadImage);

// Get images by category
router.get("/gallery/:category", getImagesByCategory);

module.exports = router;
