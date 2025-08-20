// controllers/aiController.js
import axios from "axios";
import Creation from "../models/Creation.js"; // note the .js extension

// Generate Image (can be switched to Gemi API)
export const generateImage = async (req, res) => {
  const { prompt } = req.body;
    const userId = req.userId;
; // userId from verified Clerk token

  try {
    // Example for Gemi API, replace endpoint & headers as needed
    const response = await axios.post(
      "https://api.gemi.ai/v1/generate-image",
      { prompt, size: "512x512" },
      { headers: { Authorization: `Bearer ${process.env.GEMI_API_KEY}` } }
    );

    const imageUrl = response.data.output[0].url;

    const creation = await Creation.create({
      user: userId,
      title: prompt,
      type: "image",
      prompt,
      output: imageUrl,
    });
    res.json(creation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate image" });
  }
};

// Remove Background using ClipDrop

export const removeBackground = async (req, res) => {
  const { imageUrl } = req.body;
    const userId = req.userId;
 // userId from verified Clerk token


  try {
    const response = await axios({
      method: "post",
      url: "https://clipdrop-api.co/remove-background/v1",
      responseType: "arraybuffer",
      headers: {
        "x-api-key": process.env.CLIPDROP_API_KEY,
        "Content-Type": "application/json",
      },
      data: { image_url: imageUrl },
    });

    const base64Image = `data:image/png;base64,${Buffer.from(response.data, "binary").toString("base64")}`;

    const creation = await Creation.create({
      user: userId,
      title: "Background Removed",
      type: "background-remove",
      prompt: "Remove background via ClipDrop",
      output: base64Image,
    });

    res.json(creation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "ClipDrop background removal failed" });
  }
};

// Remove Object using ClipDrop
export const removeObject = async (req, res) => {
  const { imageUrl, objectDescription } = req.body;
  const userId = req.userId;
 // userId from verified Clerk token

  try {
    const response = await axios({
      method: "post",
      url: "https://clipdrop-api.co/remove-background/v1", // ClipDrop currently uses same endpoint for object removal edits
      responseType: "arraybuffer",
      headers: {
        "x-api-key": process.env.CLIPDROP_API_KEY,
        "Content-Type": "application/json",
      },
      data: { image_url: imageUrl, prompt: `Remove ${objectDescription}` },
    });

    const base64Image = `data:image/png;base64,${Buffer.from(response.data, "binary").toString("base64")}`;

    const creation = await Creation.create({
      user: userId,
      title: `Removed ${objectDescription}`,
      type: "object-remove",
      prompt: `Remove ${objectDescription}`,
      output: base64Image,
    });

    res.json(creation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "ClipDrop object removal failed" });
  }
};

// Write Article (can switch to Gemi API)

export const writeArticle = async (req, res) => {
  const { topic } = req.body;
    const userId = req.userId;
 // userId from verified Clerk token

  try {
    // Example for Gemi API text endpoint
    const response = await axios.post(
      "https://api.gemi.ai/v1/text-completion",
      { prompt: `Write a detailed article about: ${topic}`, max_tokens: 500 },
      { headers: { Authorization: `Bearer ${process.env.GEMI_API_KEY}` } }
    );

    const text = response.data.output;

    const creation = await Creation.create({
      user: userId,
      title: topic,
      type: "article",
      prompt: topic,
      output: text,
    });

    res.json(creation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to write article" });
  }
};

// Review Resume (Gemi API)

export const reviewResume = async (req, res) => {
  const { resumeText } = req.body;
  const userId = req.userId;
 // userId from verified Clerk token

  try {
    const response = await axios.post(
      "https://api.gemi.ai/v1/text-completion",
      { prompt: `Review this resume and suggest improvements: ${resumeText}`, max_tokens: 300 },
      { headers: { Authorization: `Bearer ${process.env.GEMI_API_KEY}` } }
    );

    const review = response.data.output;

    const creation = await Creation.create({
      user: userId,
      title: "Resume Review",
      type: "resume",
      prompt: resumeText,
      output: review,
    });

    res.json(creation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to review resume" });
  }
};

// Blog Titles (Gemi API)

export const blogTitles = async (req, res) => {
  const { topic } = req.body;
  const userId = req.userId;
 // userId from verified Clerk token

  try {
    const response = await axios.post(
      "https://api.gemi.ai/v1/text-completion",
      { prompt: `Generate 5 creative blog titles about: ${topic}`, max_tokens: 150 },
      { headers: { Authorization: `Bearer ${process.env.GEMI_API_KEY}` } }
    );

    const titles = response.data.output;

    const creation = await Creation.create({
      user: userId,
      title: topic,
      type: "blog-titles",
      prompt: topic,
      output: titles,
    });

    res.json(creation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate blog titles" });
  }
};

