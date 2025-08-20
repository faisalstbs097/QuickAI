import React, { useState } from "react";
import { Eraser, Upload, Sparkles } from "lucide-react";
import { useUser } from '@clerk/clerk-react';
import { useFetchWithAuth } from "../utils/fetchWithAuth";

const RemoveBackground = () => {

    const {user} = useUser();

const fetchWithAuth = useFetchWithAuth();
const [input, setInput] = useState(null);
const [resultImage, setResultImage] = useState(null);


  const onSubmitHandler = (e) => {
    e.preventDefault();
    // handle form submit
  };

  //const handleRemoveBackground = () => {
    // handle background removal
  //};
  const handleRemoveBackground = async () => {
  if (!input) return;
  const formData = new FormData();
  formData.append('image', input);

  try {
    const res = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/ai/remove-background`, {
      method: 'POST',
      body: formData,
      
    });
    const data = await res.json();
    setResultImage(data.resultImage); // show result
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-[#F5F7FB] flex flex-col md:flex-row justify-center p-4 md:p-6 gap-6">
      
      {/* Left Panel */}
      <form
        onSubmit={onSubmitHandler}
        className="flex-1 bg-white p-6 rounded-lg shadow-md flex flex-col gap-6"
      >
        {/* Main Heading */}
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-orange-500" />
          Background Removal
        </h1>

        {/* Upload Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Upload className="w-5 h-5 text-orange-500" />
            Upload Image
          </h2>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setInput(e.target.files[0])}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-orange-200"
          />
          <p className="text-xs text-gray-500">
            Supports JPG, PNG, and other image formats
          </p>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleRemoveBackground}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-white font-medium rounded-md bg-gradient-to-r from-orange-400 to-red-400 hover:opacity-90 transition"
        >
          <Eraser className="w-4 h-4" />
          Remove Background
        </button>
      </form>

          {/* Right Panel */}
<div className="flex-1 bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
  {resultImage ? (
    <img src={resultImage} alt="Processed" className="rounded-lg" />
  ) : (
    <>
      <div className="flex items-center gap-2">
        <Eraser className="w-5 h-5 text-[#00AD25]" />
        <h2 className="text-lg font-semibold">Processed Images</h2>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center rounded-lg p-6">
        <Eraser size={35} className="text-[#3d413e27]" />
        <p className="text-center text-gray-300">
          Upload an image and click "Remove Background" to get started
        </p>
      </div>
    </>
  )}
</div>

    </div>
  );
};

export default RemoveBackground;
