import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job?._id}`)}
      className="p-5 rounded-lg shadow-lg bg-white border border-gray-100 cursor-pointer hover:shadow-2xl transition-all duration-200"
    >
      {/* Company Info */}
      <div className="mb-2">
        <h2 className="font-semibold text-base text-gray-800">
          {job?.company?.name || 'Unknown Company'}
        </h2>
        <p className="text-sm text-gray-500">{job?.location || 'India'}</p>
      </div>

      {/* Job Title + Description */}
      <div>
        <h3 className="font-bold text-lg text-[#1e1e1e] mb-1">{job?.title || 'Job Title'}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description || 'No description provided.'}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="text-blue-700 font-semibold" variant="ghost">
          {job?.position || 1} Position{job?.position > 1 ? 's' : ''}
        </Badge>
        <Badge className="text-[#F83002] font-semibold" variant="ghost">
          {job?.jobType || 'Full-Time'}
        </Badge>
        <Badge className="text-[#7209b7] font-semibold" variant="ghost">
          {job?.salary || 'N/A'} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
