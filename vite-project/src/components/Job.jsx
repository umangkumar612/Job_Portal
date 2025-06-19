import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    };

    const daysAgo = daysAgoFunction(job?.createdAt);
    const displayDate = daysAgo === 0 ? "Today" : `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;

    return (
        <div className='p-5 rounded-xl shadow-lg bg-white border border-gray-100 hover:shadow-2xl transition-shadow'>
            <div className='flex items-center justify-between mb-2'>
                <p className='text-xs text-gray-500'>{displayDate}</p>
                <Button variant="outline" className="rounded-full" size="icon">
                    <Bookmark />
                </Button>
            </div>

            <div className='flex items-center gap-3 my-3'>
                <Avatar className="w-12 h-12">
                    <AvatarImage src={job?.company?.logo || "/default-logo.png"} alt="Company Logo" />
                </Avatar>
                <div>
                    <h2 className='text-base font-semibold'>{job?.company?.name || "Company Name"}</h2>
                    <p className='text-sm text-gray-500'>{job?.location || "India"}</p>
                </div>
            </div>

            <div className="my-2">
                <h1 className='text-xl font-bold text-gray-800'>{job?.title}</h1>
                <p className='text-sm text-gray-600 line-clamp-3'>{job?.description}</p>
            </div>

            <div className='flex flex-wrap gap-2 mt-4'>
                <Badge variant="ghost" className="text-blue-700 font-semibold">{job?.position} Position(s)</Badge>
                <Badge variant="ghost" className="text-red-600 font-semibold">{job?.jobType}</Badge>
                <Badge variant="ghost" className="text-purple-700 font-semibold">{job?.salary} LPA</Badge>
            </div>

            <div className='flex items-center gap-3 mt-5'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                <Button className="bg-[#7209b7] hover:bg-[#5a0791] text-white">Save For Later</Button>
            </div>
        </div>
    );
};

export default Job;
