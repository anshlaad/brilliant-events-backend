const Image = require("../models/Image");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadImage = async (req, res) => {
  try {
    const file = req.file;
    const category = req.body.category;

    if (!file) return res.status(400).json({ error: "No file uploaded" });

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: category,
    });

    // Remove temp file from server
    fs.unlinkSync(file.path);

    // Save to MongoDB
    const newImage = new Image({
      url: result.secure_url,
      category,
    });
    await newImage.save();

    res.status(200).json({ message: "Image uploaded successfully", data: newImage });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ error: "Image upload failed" });
  }
};

exports.getImagesByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const images = await Image.find({ category }).sort({ uploadedAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
};
