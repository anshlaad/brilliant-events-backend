const cloudinary = require("cloudinary").v2;
const Image = require("../models/Image");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadImage = async (req, res) => {
  try {
    const filePath = req.file.path;
    const category = req.body.category;

    const result = await cloudinary.uploader.upload(filePath, {
      folder: category
    });

    fs.unlinkSync(filePath); // Remove from local storage

    const newImage = new Image({
      url: result.secure_url,
      category
    });

    await newImage.save();

    res.status(200).json({ message: "Image uploaded", url: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};

const getImagesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const images = await Image.find({ category });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch images" });
  }
};

module.exports = {
  uploadImage,
  getImagesByCategory
};
