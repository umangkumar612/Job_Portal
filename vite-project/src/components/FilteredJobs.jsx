import React, { useState } from 'react';

const dummyJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova",
    location: "Remote",
    skills: ["React", "Tailwind", "REST APIs"]
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "CodeCraft",
    location: "Bangalore",
    skills: ["Node.js", "Express", "MongoDB"]
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "DevSphere",
    location: "Remote",
    skills: ["React", "Node.js", "PostgreSQL"]
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "PixelPro",
    location: "Delhi",
    skills: ["Figma", "Sketch", "Prototyping"]
  },
  {
    id: 5,
    title: "Data Scientist",
    company: "DataZen",
    location: "Hyderabad",
    skills: ["Python", "Pandas", "Machine Learning"]
  },
  {
    id: 6,
    title: "Mobile Developer",
    company: "AppWorks",
    location: "Remote",
    skills: ["Flutter", "Dart", "Firebase"]
  },
  {
    id: 7,
    title: "DevOps Engineer",
    company: "Cloudify",
    location: "Mumbai",
    skills: ["Docker", "Kubernetes", "AWS"]
  },
];

const FilteredJobs = () => {
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState("All");

  const locations = ["All", ...new Set(dummyJobs.map(job => job.location))];
  const allSkills = [...new Set(dummyJobs.flatMap(job => job.skills))];

  const filteredJobs = dummyJobs.filter(job => {
    const matchLocation = selectedLocation === "All" || job.location === selectedLocation;
    const matchSkill = selectedSkill === "All" || job.skills.includes(selectedSkill);
    return matchLocation && matchSkill;
  });

  return (
    <section className="px-6 py-10 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center">🎯 Filter & Apply Jobs</h2>

      <div className="flex gap-4 justify-center mb-6">
        <select
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          {locations.map(loc => <option key={loc}>{loc}</option>)}
        </select>

        <select
          onChange={(e) => setSelectedSkill(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option>All</option>
          {allSkills.map(skill => <option key={skill}>{skill}</option>)}
        </select>
      </div>

      <div className="grid gap-6 max-w-5xl mx-auto">
        {filteredJobs.map(job => (
          <div key={job.id} className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-gray-600 mb-1">Company: <strong>{job.company}</strong></p>
            <p className="text-gray-600 mb-1">Location: <strong>{job.location}</strong></p>
            <p className="text-gray-600 mb-3">Skills: {job.skills.join(', ')}</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Apply Now</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FilteredJobs;
