import React, { useState } from 'react';
import { Sparkles ,Image } from 'lucide-react';
import { Switch } from '@headlessui/react';
import { useFetchWithAuth } from "../utils/fetchWithAuth";

 // Toggle switch

const GeneratedImages = () => {
  const styles = [
    "Realistic",
    "Ghibli style",
    "Anime style",
    "Cartoon style",
    "Fantasy style",
    "Realistic style",
    "3D style",
    "Portrait style"
  ];

  const [selectedStyle, setSelectedStyle] = useState(styles[0]);
  const [input, setInput] = useState('')
  const [isPublic, setIsPublic] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);
  const fetchWithAuth = useFetchWithAuth();


    //const onSubmitHandler =async (e) => {
   //e.preventDefault();
  //};

const onSubmitHandler = async (e) => {
  e.preventDefault();
  try {
    const res = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/ai/generate-image`, {
      method: 'POST',
      body: JSON.stringify({ prompt: input, style: selectedStyle, isPublic })
    });
    const data = await res.json();
    setGeneratedImages(data.images); // state to store API images
  } catch (err) {
    console.error(err);
  }
};


  return (
  < div className="min-h-[calc(100vh-64px)] w-full bg-[#F5F7FB] flex flex-col md:flex-row justify-center p-4 md:p-6 gap-6">
  {/* Left Section */}
  < form onSubmit={onSubmitHandler} className="w-full md:w-1/2 bg-white p-4 md:p-6 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold flex items-center gap-2">
      <Sparkles size={23} className="text-purple-500" />
      AI Image Generator
    </h2> 

    <p className="mt-4 md:mt-6 text-sm font-medium">Describe your Image</p>

    {/* Description Input */}
    <textarea
      onChange={(e) => setInput(e.target.value)}
      value={input}
      placeholder="Describe what you want to see in the image.."
      className="w-full p-3 mt-3 md:mt-4 border rounded-lg focus:outline-none focus:ring focus:border-green-400 text-sm"
      rows="4"
    ></textarea>

    <p className="mt-4 md:mt-6 text-sm font-medium">Style</p>

    {/* Style Buttons */}
    <div className="mt-3 md:mt-4 flex flex-wrap gap-2 md:gap-3">
      {styles.map((items) => (
        <button
          key={items}
          onClick={() => setSelectedStyle(items)}
          className={`px-3 md:px-4 py-2 rounded-full border text-sm transition-all 
            ${selectedStyle === items
              ? "bg-green-100 border-green-500 text-green-600"
              : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
        >
          {items}
        </button>
      ))}
    </div>

    {/* Public Toggle */}
   
      {/*<Switch
        checked={isPublic}
        onChange={(e) => setIsPublic(e.target.checked)}
        className={`${isPublic ? "bg-green-500" : "bg-gray-300"} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
      >
        <span
          className={`${isPublic ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>*/}
      <div className="flex items-center gap-3 md:gap-4 mt-4">
  <label className="relative cursor-pointer">
    <input
      type="checkbox"
      onChange={(e) => setIsPublic(e.target.checked)}
      checked={isPublic}
      className="sr-only peer"
    />
    <div className="w-9 h-5 bg-slate-300 rounded-full transition peer-checked:bg-green-500"></div>
    <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition transform peer-checked:translate-x-4"></span>
  </label>
  <span className="text-gray-600 text-sm md:text-base font-medium">
    Make this image Public
  </span>
</div>


    {/* Generate Button */}
    <button className="mt-5 md:mt-6 w-full bg-gradient-to-r from-[#00AD25] to-[#8E37EB] text-white py-3 rounded-lg font-medium hover:opacity-90 transition">
      Generate Image
    </button>
  </form>

  {/* Right Section */}
<div className="w-full md:w-1/2 bg-white p-4 md:p-6 rounded-lg shadow-md flex flex-col gap-3 md:gap-4">
  <h2 className="text-lg font-semibold flex items-center gap-2 mb-3">
    <Image className="w-5 h-5 text-[#00AD25]" />
    Generated Images
  </h2>

  {generatedImages.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-4">
      {generatedImages.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`Generated ${idx}`}
          className="w-full h-48 object-cover rounded-lg"
        />
      ))}
    </div>
  ) : (
    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 border border-dashed rounded-lg p-6">
      <Image className="w-5 h-5 text-[#3d413e27]" />
      <p className="text-center text-sm md:text-base">
        Enter a topic and click “Generate image” to get started
      </p>
    </div>
  )}
</div>

  </div>


  );
};
export default GeneratedImages;