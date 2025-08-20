import React, { useState } from "react";
import { Scissors, Sparkles } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useFetchWithAuth } from "../utils/fetchWithAuth";

const RemoveObject = () => {

  const {user} = useUser
  const [selectedFile, setSelectedFile] = useState(null);
  const [objectName, setObjectName] = useState("");
  const [processedImage, setProcessedImage] = useState(null);
  const fetchWithAuth = useFetchWithAuth();


  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  //const handleRemoveObject = () => {
    //console.log("Removing object:", objectName, "from", selectedFile);
    // TODO: Add API call here
  //};

  const handleRemoveObject = async () => {
  if (!selectedFile || !objectName) return;
  const formData = new FormData();
  formData.append('image', selectedFile);
  formData.append('objectName', objectName);

  try {
    const res = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/ai/remove-object`, {
      method: 'POST',
      body: formData,
      
    });
    const data = await res.json();
    setProcessedImage(data.image); // store returned image
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className="h-[calc(100vh-64px)] w-full bg-[#F9FAFB] flex justify-center p-6">
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl">
        {/* Left Panel */}
        <form
          onSubmit={onSubmitHandler}
          className="flex-1 bg-white p-6 rounded-lg shadow border border-gray-200 flex flex-col gap-6"
        >
          <h1 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            Object Removal
          </h1>

          {/* File Input */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Upload image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Object Name Input */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">
              Describe object name to remove
            </label>
            <textarea
              placeholder="e.g., watch or spoon , Only single object name"
              value={objectName}
              onChange={(e) => setObjectName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Button */}
          <button
            type="button"
            onClick={handleRemoveObject}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-white font-medium rounded-md bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition"
          >
            <Scissors className="w-4 h-4" />
            Remove Object
          </button>
        </form>

              {/* Right Panel */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow border border-gray-200 flex flex-col">
        {processedImage ? (
          <img src={processedImage} alt="Processed" className="rounded-lg" />
        ) : (
          <>
            <div className="flex items-center gap-2 mb-6">
              <Scissors className="w-5 h-5 text-indigo-500" />
              <h2 className="text-lg font-semibold">Processed Image</h2>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <Scissors className="w-10 h-10 mb-2" />
              <p className="text-center text-sm">
                Upload an image and click <strong>"Remove Object"</strong> to get started
              </p>
            </div>
          </>
  )}
</div>

        </div>
      </div>
    
  );
};

export default RemoveObject;
