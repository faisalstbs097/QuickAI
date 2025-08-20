import React, { useState } from "react";
import { FileText, Sparkles } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useFetchWithAuth } from "../utils/fetchWithAuth";

const ResumeReview = () => {

  const {user} = useUser
  const [resumeFile, setResumeFile] = useState(null);
  const [reviewResult, setReviewResult] = useState(null);
  const fetchWithAuth = useFetchWithAuth();


 const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  //const handleReviewResume = () => {
    //console.log("Reviewing resume:", resumeFile);
    // TODO: API call to review resume
  //};

  const handleReviewResume = async () => {
  if (!resumeFile) return;
  const formData = new FormData();
  formData.append('resume', resumeFile);

  try {
    const res = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/ai/review-resume`, {
      method: 'POST',
      body: formData,
      
    });
    const data = await res.json();
    setReviewResult(data.analysis); // store analysis result
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className="h-[calc(100vh-64px)] bg-gray-50 px-6 py-10">
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Left Panel */}
         <form onSubmit={onSubmitHandler}className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow border border-gray-200">
          {/* Heading */}
          <h1 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-green-500" />
            Resume Review
          </h1>

          {/* Upload Input */}
          <label className="block text-sm font-medium mb-1">Upload Resume</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setResumeFile(e.target.files[0])}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-2"
          />
          <p className="text-xs text-gray-500 mb-4">Supports PDF resume only.</p>

          {/* Button */}
          <button
            onClick={handleReviewResume}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-white font-medium rounded-md bg-gradient-to-r from-green-400 to-teal-500 hover:opacity-90 transition"
          >
            <FileText className="w-4 h-4" />
            Review Resume
          </button>
        </form>

              {/* Right Panel */}
      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow border border-gray-200 flex flex-col">
        {reviewResult ? (
          <div className="overflow-auto">
            {/* Render your review result here */}
            {reviewResult.map((line, idx) => (
              <p key={idx} className="text-gray-800 text-sm">{line}</p>
            ))}
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-green-500" />
              <h2 className="text-lg font-semibold">Analysis Results</h2>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <FileText className="w-10 h-10 mb-2" />
              <p className="text-center text-sm">
                Upload a resume and click <strong>"Review Resume"</strong> to get started
              </p>
            </div>
    </>
  )}
</div>


      </div>
    </div>
  );
};

export default ResumeReview;
