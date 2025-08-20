// backend/routes/communityRoutes.js
import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();

// Example route
router.get("/", auth, (req, res) => {
  res.json({ message: "Community route working!" });
});

export default router;  // ✅ ESM default export
