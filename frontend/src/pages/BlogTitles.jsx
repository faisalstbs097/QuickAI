import React, { useState } from "react";
import { Sparkles, Hash, Edit3 } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { useFetchWithAuth } from "../utils/fetchWithAuth";


const BlogTitles = () => {
  const categories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [keyword, setKeyword] = useState("");
  const [generatedTitles, setGeneratedTitles] = useState([]);
  const fetchWithAuth = useFetchWithAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    
     // Check console


    try {
      const response = await fetchWithAuth(`${import.meta.env.VITE_API_URL.trim()}/ai/blog-titles`, {
      method: "POST",
      body: JSON.stringify({ keyword, category: selectedCategory }),
});

      const data = await response.json();
      setGeneratedTitles(data.titles || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] w-full bg-[#F5F7FB] flex justify-center p-6">
      <form
        onSubmit={onSubmitHandler}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl"
      >
        {/* Left Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
            <Sparkles size={18} className="text-purple-500" />
            AI Title Generator
          </h2>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Keyword
          </label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="The future of artificial intelligence is..."
            className="w-full border border-gray-300 rounded-md p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map((item, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setSelectedCategory(item)}
                className={`px-4 py-1 rounded-full text-sm border transition ${
                  selectedCategory === item
                    ? "border-purple-500 bg-white text-purple-600"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white font-medium bg-gradient-to-r from-[#f6963c] to-[#68ea34] hover:from-purple-600 hover:to-purple-700 transition-all"
          >
            <Hash size={16} />
            Generate title
          </button>
        </div>

        {/* Right Card - Generated Titles */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col gap-4 w-full md:col-span-1">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
            <Edit3 size={18} className="text-blue-500" />
            Generated Titles
          </h2>

          {generatedTitles.length > 0 ? (
            <div className="text-gray-700 whitespace-pre-wrap">
              {generatedTitles.map((title, i) => (
                <p key={i} className="mb-2">{title}</p>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm text-center">
              Enter a topic and click “Generate article” to get started
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default BlogTitles;
