// src/components/FeaturedJobs.jsx
import React from 'react';

const FeaturedJobs = () => {
  return (
    <section className="px-6 py-10 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center">Latest & Top Job Openings</h2>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
        <h3 className="text-xl font-semibold">Frontend Developer</h3>
        <p className="text-gray-600 mb-2">Company: <strong>TechNova</strong></p>
        <p className="text-gray-600 mb-2">Location: <strong>Remote</strong></p>
        <p className="text-gray-600 mb-4">Skills: React, Tailwind, REST APIs</p>
        <div className="flex justify-between">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">View Details</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Job Hunt →</button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
