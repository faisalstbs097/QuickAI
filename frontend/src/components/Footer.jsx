{/*import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-white py-8 px-6 md:px-20">
      
      <div className="mb-8">
     <h1>
        <img src={assets.logo} alt="" className='w-32 sm:w-36' />
     </h1>
        <p className="text-gray-600 mt-2 max-w-md">
          Experience the power of AI with QuickAi. Transform your content creation
          with our suite of premium AI tools. Write articles, generate images, and
          enhance your workflow.
        </p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div>
          <h2 className="font-semibold mb-4">Company</h2>
          <ul className="space-y-2 text-gray-700">
            <li><a href="/" className="hover:text-purple-600">Home</a></li>
            <li><a href="/about" className="hover:text-purple-600">About us</a></li>
            <li><a href="/contact" className="hover:text-purple-600">Contact us</a></li>
            <li><a href="/privacy" className="hover:text-purple-600">Privacy policy</a></li>
          </ul>
        </div>

        Newsletter 
        <div>
          <h2 className="font-semibold mb-4">Subscribe to our newsletter</h2>
          <p className="text-gray-600 mb-4">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <form className="flex max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              type="submit" 
              className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;*/}

import React from "react";
//import { assets } from "../assets/assets";

const Footer = () => {

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      alert("Subscribed successfully!");
    } catch (err) {
      console.error("Subscription failed:", err);
    }
  };

  return (
    <footer className="bg-white py-8 px-6 md:px-20">
      <div className="mb-8">
        <h1>
          <img src="/assets/logo.png" alt="Logo" className='w-32 sm:w-36' />
        </h1>
        <p className="text-gray-600 mt-2 max-w-md">
          Experience the power of AI with QuickAi. Transform your content creation
          with our suite of premium AI tools. Write articles, generate images, and
          enhance your workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="font-semibold mb-4">Company</h2>
          <ul className="space-y-2 text-gray-700">
            <li><a href="/" className="hover:text-purple-600">Home</a></li>
            <li><a href="/about" className="hover:text-purple-600">About us</a></li>
            <li><a href="/contact" className="hover:text-purple-600">Contact us</a></li>
            <li><a href="/privacy" className="hover:text-purple-600">Privacy policy</a></li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-4">Subscribe to our newsletter</h2>
          <p className="text-gray-600 mb-4">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <form className="flex max-w-md" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

