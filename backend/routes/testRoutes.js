import express from 'express';
const router = express.Router();

// Simple test POST route
router.post('/blog-title', (req, res) => {
  console.log('Request body:', req.body); // check what Postman sends
  res.json({ message: 'Test route is working!', bodyReceived: req.body });
});

export default router;
