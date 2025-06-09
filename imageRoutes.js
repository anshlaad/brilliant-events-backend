const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Temporary local upload

const { uploadImage, getImagesByFolder } = require("../controllers/imageController");

// 📤 Image Upload Route
router.post("/upload", upload.single("file"), uploadImage);

// 📥 Get Images by Folder Route
router.get("/:folder", getImagesByFolder);

module.exports = router;

