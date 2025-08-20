{/*import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard.jsx';
import WriteArticle from './pages/WriteArticle.jsx';
import BlogTitles from './pages/BlogTitles.jsx';
import GenerateImages from './pages/GenerateImages.jsx';
import RemoveBackground from './pages/RemoveBackground.jsx';
import Community from './pages/Community.jsx';
import ReviewResume from './pages/ReviewResume.jsx';
import RemoveObject from './pages/RemoveObject.jsx';
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';

const App = () => {

  const {getToken} = useAuth()
  useEffect(()=>{
    getToken().then((token)=>console.log(token));
  },[])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ai" element={<Layout />}>
        
        <Route index element={<Dashboard />} />        
        <Route path="write-article" element={<WriteArticle />} />  
        <Route path="blog-titles" element={<BlogTitles />} />      
        <Route path="generate-images" element={<GenerateImages />} />
        <Route path="remove-background" element={<RemoveBackground />} />
        <Route path="review-resume" element={<ReviewResume />} />
        <Route path="remove-object" element={<RemoveObject />} />
        <Route path="community" element={<Community />} />
      </Route>
    </Routes>
  );
};

export default App;*/}


import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

// Pages
import Home from './pages/Home';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import WriteArticle from './pages/WriteArticle';
import BlogTitles from './pages/BlogTitles';
import GenerateImages from './pages/GenerateImages';
import RemoveBackground from './pages/RemoveBackground';
import ReviewResume from './pages/ReviewResume';
import RemoveObject from './pages/RemoveObject';
import Community from './pages/Community';

const App = () => {
  
  //useEffect(() => {
   // getToken().then((token) => console.log("Clerk Token:", token));
 // }, []);

  return (



    <Routes>
      {/* Home Page */}
      <Route path="/" element={<Home />} />

      {/* AI Tools Nested Routes */}
      <Route path="/ai" element={<Layout />}>
        <Route index element={<Dashboard />} />                  {/* /ai */}
        <Route path="write-article" element={<WriteArticle />} /> {/* /ai/write-article */}
        <Route path="blog-titles"element={<BlogTitles />} />     {/* /ai/blog-titles */}
        <Route path="generate-images" element={<GenerateImages />} /> {/* /ai/generate-images */}
        <Route path="remove-background" element={<RemoveBackground />} /> {/* /ai/remove-background */}
        <Route path="review-resume" element={<ReviewResume />} />          {/* /ai/review-resume */}
        <Route path="remove-object" element={<RemoveObject />} />          {/* /ai/remove-object */}
        <Route path="community" element={<Community />} />                  {/* /ai/community */}
      </Route>

      {/* Optional: Redirect unknown routes to Home */}
      <Route path="*" element={<Home />} />
    </Routes>


  );
};

export default App;
