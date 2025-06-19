import { useEffect, useState } from "react";
import axios from "axios";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/job")
      .then(res => setJobs(res.data))
      .catch(err => console.error("Error fetching jobs", err));
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h2>Available Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        jobs.map(job => (
          <div key={job._id} style={{ border: "1px solid #ccc", margin: 10, padding: 15 }}>
            <h3>{job.title}</h3>
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

export default JobList;
