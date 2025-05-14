// backend/config/cloudinaryConfig.js

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Cloudinary Storage Setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "articles", // More meaningful than "articles" for this use case
    resource_type: "raw", // Required for non-image files like PDFs
    allowed_formats: ["pdf", "doc", "docx"],
    public_id: (req, file) => `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`,
  },
});

module.exports = { cloudinary, storage };
