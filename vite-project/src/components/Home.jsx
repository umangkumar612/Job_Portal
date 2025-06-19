import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import FilteredJobs from './FilteredJobs';
import Footer from './shared/Footer'
import FeaturedJobs from './FeaturedJobs'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);

return (
  <div>
    <Navbar />
    <HeroSection />
    <CategoryCarousel />
    <FeaturedJobs /> {/* ← optional */}
    <FilteredJobs /> {/* ✅ ADD THIS HERE */}
    <LatestJobs />
    <Footer />
  </div>
);
}

export default Home
