import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';
import { toast } from 'sonner';

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const [isApplied, setIsApplied] = useState(false);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Something went wrong.');
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          const alreadyApplied = res.data.job.applications?.some(
            (application) => application.applicant === user?._id
          );
          setIsApplied(alreadyApplied);
        }
      } catch (error) {
        console.log(error);
        toast.error('Unable to fetch job data');
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  // Show loading until job data is available
  if (!singleJob) {
    return <p className="text-center my-10 text-gray-600">Loading job details...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{singleJob?.title || 'Job Title'}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <Badge className="text-blue-700 font-semibold" variant="ghost">
              {singleJob?.position || 1} Position{singleJob?.position > 1 ? 's' : ''}
            </Badge>
            <Badge className="text-[#F83002] font-semibold" variant="ghost">
              {singleJob?.jobType || 'Full Time'}
            </Badge>
            <Badge className="text-[#7209b7] font-semibold" variant="ghost">
              {singleJob?.salary || 0} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={!isApplied ? applyJobHandler : null}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#7209b7] hover:bg-[#5f32ad]'
          }`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      {/* Description */}
      <h2 className="border-b-2 border-gray-200 font-semibold py-4 mt-6">Job Description</h2>
      <div className="my-4 space-y-3 text-sm text-gray-800">
        <p>
          <strong>Role:</strong> <span className="pl-2">{singleJob?.title}</span>
        </p>
        <p>
          <strong>Location:</strong> <span className="pl-2">{singleJob?.location || 'India'}</span>
        </p>
        <p>
          <strong>Description:</strong> <span className="pl-2">{singleJob?.description}</span>
        </p>
        <p>
          <strong>Experience:</strong>{' '}
          <span className="pl-2">{singleJob?.experience || 0} yrs</span>
        </p>
        <p>
          <strong>Salary:</strong> <span className="pl-2">{singleJob?.salary || 0} LPA</span>
        </p>
        <p>
          <strong>Total Applicants:</strong>{' '}
          <span className="pl-2">{singleJob?.applications?.length || 0}</span>
        </p>
        <p>
          <strong>Posted Date:</strong>{' '}
          <span className="pl-2">{singleJob?.createdAt?.split('T')[0]}</span>
        </p>
      </div>
    </div>
  );
};

export default JobDescription;
