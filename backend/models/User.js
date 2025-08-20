// backend/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, unique: true }, // Clerk user ID
  name: String,
  email: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
