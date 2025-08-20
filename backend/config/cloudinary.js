const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure your Cloudinary credentials in .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure storage for Multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "quickai_community",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

module.exports = { cloudinary, storage };
