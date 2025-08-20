import { Pencil, Image, Hash, Scissors, FileText, Layers } from 'lucide-react';

export const AiToolsData = [
  {
    title: "AI Article Writer",
    description: "Generate high-quality, engaging articles on any topic with our AI writing technology.",
    icon: Pencil,
    bg: { from: "#00AD25", to: "#8E37EB" },
    path: "/ai/write-article",
  },
  {
    title: "Blog Title Generator",
    description: "Find the perfect, catchy title for your blog posts with our AI-powered generator.",
    icon: Hash,
    bg: { from: "#A855F7", to: "#D946EF" },
    path: "/ai/blog-titles",
  },
  {
    title: "AI Image Generation",
    description: "Create stunning visuals with our AI image generation tool, Experience the power of AI",
    icon: Image,
    bg: { from: "#10B981", to: "#14B8A6" },
    path: "/ai/generate-images",
  },
  {
    title: "Background Removal",
    description: "Effortlessly remove backgrounds from your images with our AI-driven tool.",
    icon: Layers,
    bg: { from: "#F97316", to: "#FB923C" },
    path: "/ai/remove-background",
  },
  {
    title: "Object Removal",
    description: "Remove unwanted objects from your images seamlessly with our AI object removal tool.",
    icon: Scissors,
    bg: { from: "#3B82F6", to: "#60A5FA" },
    path: "/ai/remove-object",
  },
  {
    title: "Resume Reviewer",
    description: "Get your resume reviewed by AI to improve your chances of landing your dream job.",
    icon: FileText,
    bg: { from: "#14B8A6", to: "#06B6D4" },
    path: "/ai/review-resume",
  },
];
