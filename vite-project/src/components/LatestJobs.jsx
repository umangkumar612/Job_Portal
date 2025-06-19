import React, { useEffect, useState } from "react";

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("/api/v1/job") // if proxy is set up
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Failed to load jobs:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Latest Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} className="border p-4 mb-4 rounded shadow">
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> ₹{job.salary}</p>
            <p>{job.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default LatestJobs;
