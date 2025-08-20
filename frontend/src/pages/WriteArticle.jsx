import React, { useState } from "react";
import { Pencil, SpaceIcon, Sparkle } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useFetchWithAuth } from "../utils/fetchWithAuth";

const WriteArticle = () => {

  const {user} = useUser
 
  const articleLength = [
    {length:800,text:'Short (500–800 word)'},
    {length:1200,text:'Medium (800–1200 word)'},
    {length:1600,text:'Long (1200+ word)'}
  ]
  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setinput] = useState("")
  const [generatedArticle, setGeneratedArticle] = useState(""); // store API response
  const fetchWithAuth = useFetchWithAuth();


  //const onSubmitHandler = async (e) => {
    //e.preventDefault();
  //}

  const onSubmitHandler = async (e) => {
  e.preventDefault();
  if (!input) return;

  try {
    const res = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/ai/generate-article`, {
      method: "POST",
      body: JSON.stringify({
        topic: input,
        length: selectedLength.length
      })
    });

    const data = await res.json();
    setGeneratedArticle(data.article); // store generated article
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className="h-[calc(100vh-64px)] w-full bg-[#F9FAFB] flex justify-center p-6">
      <form onSubmit ={onSubmitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl  ">

        {/* Left Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
            <Sparkle size={18} className="text-blue-500" />
            Article Configuration
          </h2>

          {/* Article Topic */}
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Article Topic
          </label>
          <input
            type="text"
            placeholder="The future of artificial intelligence is..."
            className="w-full border border-gray-300 rounded-md p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Article Length */}
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Article Length
          </label>
          <div className="flex flex-wrap gap-2 mb-6">
            {/*<button
              onClick={() => setSelectedLength("short")}
              className={`px-4 py-2 text-sm rounded-full border ${
                selectedLength === "short"
                  ? "bg-blue-50 border-blue-200 text-blue-900"
                  : "bg-white border-gray-300 text-gray-700"
              }`}
            >
              Short (500–800 word)
            </button>
            <button
              onClick={() => setSelectedLength("medium")}
              className={`px-4 py-2 text-sm rounded-full border ${
                selectedLength === "medium"
                  ? "bg-blue-50 border-blue-200 text-blue-900"
                  : "bg-white border-gray-300 text-gray-700"
              }`}
            >
              Medium (800–1200 word)
            </button>
            <button
              onClick={() => setSelectedLength("long")}
              className={`px-4 py-2 text-sm rounded-full border ${
                selectedLength === "long"
                  ? "bg-blue-50 border-blue-200 text-blue-900"
                  : "bg-white border-gray-300 text-gray-700"
              }`}
            >
              Long (1200+ word)
            </button>*/}

            <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
                {articleLength.map((item, index) => (
                  <span onClick ={() => setSelectedLength(item)}
                   key={index}
                  className={`text-xs px-4 py-1 rounded-full  border cursor-pointer
                    ${selectedLength.text === item.text ? 'bg-blue-100 border-blue-200 text-blue-900' : ''}`}
                  >
                {item.text}
                </span>
              ))}
            </div>
           
                
            </div>
          

          {/* Generate Button */}
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 transition-all">
            <Pencil size={16} />
            Generate article
          </button>
        </div>

        {/* Right Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center text-center">
        {generatedArticle ? (
          <div className="overflow-auto">
            <p className="text-gray-800 text-sm whitespace-pre-line">{generatedArticle}</p>
          </div>
        ) : (
          <>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
            <Pencil size={18} className="text-blue-500" />
            Article Configuration
          </h2>
          <Pencil size={40} className="text-gray-400 mb-3" />
          <p className="text-gray-500 text-sm">
            Enter a topic and click “Generate article” to get started
          </p>
        </>
          )}
        </div>


      </form>
    </div>
  );
};

export default WriteArticle;
