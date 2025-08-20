import React from "react";
import { Star, StarOff } from "lucide-react";

// Single Testimonial Card
const TestimonialCard = ({ testimonial }) => {
  const { image, name, title, content, rating } = testimonial;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-3 transition-all duration-300">
      {/* Star Rating */}
      <div className="flex items-center mb-4">
        {Array.from({ length: 5 }).map((_, i) =>
          i < rating ? (
            <Star key={i} className="w-5 h-5 text-yellow-400" />
          ) : (
            <StarOff key={i} className="w-5 h-5 text-gray-300" />
          )
        )}
      </div>

      {/* Testimonial content */}
      <p className="text-gray-700 mb-4">{content}</p>

      {/* User info */}
      <div className="flex items-center">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-gray-500 text-sm">{title}</p>
        </div>
      </div>
    </div>
  );
};

// Testimonials Section
const Testimonials = () => {
  const testimonials = [
    {
      image: "/images/user1.jpg",
      name: "Alice Johnson",
      title: "Content Creator",
      content: "This AI tool changed the way I work. Amazing results!",
      rating: 5,
    },
    {
      image: "/images/user2.jpg",
      name: "Bob Smith",
      title: "Developer",
      content: "Very useful and intuitive. Highly recommend it!",
      rating: 4,
    },
    {
      image: "/images/user3.jpg",
      name: "Clara Williams",
      title: "Designer",
      content: "Saved me hours of work. Fantastic experience!",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Loved by Creators</h2>
        <p className="text-gray-500">
          Don't just take our word for it. Here's what our users are saying.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {testimonials.map((t, index) => (
          <TestimonialCard key={index} testimonial={t} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
