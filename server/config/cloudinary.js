// backend/config/cloudinaryConfig.js
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "articles",
    resource_type: "raw", // Needed for PDFs
    allowed_formats: ["pdf","doc", "docx"],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

module.exports = { cloudinary, storage };
