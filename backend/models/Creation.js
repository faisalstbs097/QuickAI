// backend/models/Creation.js
import mongoose from "mongoose";

const creationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  type: String, // "image", "background-remove", "object-remove", "article", "resume"
  prompt: String,
  output: String, // URL or text
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Creation", creationSchema);
