import express from "express";  // import express
const router = express.Router(); // declare router only once

import auth from "../middleware/auth.js"; // note .js extension
import {
  generateImage,
  removeBackground,
  removeObject,
  writeArticle,
  reviewResume,
  blogTitles,
} from "../controllers/aiController.js"; // note .js extension

// Define routes
router.post("/generate-image", auth, generateImage);
router.post("/remove-background", auth, removeBackground);
router.post("/remove-object", auth, removeObject);
router.post("/write-article", auth, writeArticle);
router.post("/review-resume", auth, reviewResume);
router.post("/blog-titles", auth, blogTitles);

export default router;
