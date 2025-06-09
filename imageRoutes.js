const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { uploadImage } = require("../controllers/imageController");

router.post("/upload", upload.single("file"), uploadImage);

module.exports = router;
