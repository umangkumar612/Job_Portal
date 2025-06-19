// import React, { useEffect, useState } from 'react';
// import Navbar from './shared/Navbar';
// import FilterCard from './FilterCard';
// import Job from './Job';
// import { useSelector } from 'react-redux';
// import { motion } from 'framer-motion';

// const Jobs = () => {
//   const { allJobs, searchedQuery } = useSelector((store) => store.job);
//   const [filterJobs, setFilterJobs] = useState(allJobs);

//   useEffect(() => {
//     if (searchedQuery) {
//       const filteredJobs = allJobs.filter((job) => {
//         const query = searchedQuery.toLowerCase();
//         return (
//           job.title?.toLowerCase().includes(query) ||
//           job.description?.toLowerCase().includes(query) ||
//           job.location?.toLowerCase().includes(query)
//         );
//       });
//       setFilterJobs(filteredJobs);
//     } else {
//       setFilterJobs(allJobs);
//     }
//   }, [allJobs, searchedQuery]);

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-7xl mx-auto mt-5 px-4">
//         <div className="flex gap-5">
//           {/* Sidebar */}
//           <div style={{ width: '20%' }}>
//             <FilterCard />
//           </div>

//           {/* Job Listing */}
//           <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
//             {filterJobs.length <= 0 ? (
//               <div className="text-center text-gray-500 mt-10 text-lg">No jobs found.</div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {filterJobs.map((job, index) => (
//                   <motion.div
//                     key={job?._id || index}
//                     initial={{ opacity: 0, x: 100 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -100 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <Job job={job} />
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Jobs;
import { useEffect, useState } from "react";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/job")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error fetching jobs", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Available Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs available yet.</p>
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

export default Jobs;
