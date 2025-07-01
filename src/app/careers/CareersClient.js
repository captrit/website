'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  Search, 
  Filter,
  Building,
  Zap,
  Shield,
  Target,
  Eye,
  Lock
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ClientOnly from '../../components/ClientOnly';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    y: -12,
    scale: 1.03,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

// Number of jobs per page
const JOBS_PER_PAGE = 9;

export default function CareersClient({ allJobsData = [], categories = [], breadcrumbJsonLd, jobsJsonLd }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(allJobsData);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Extract unique locations for filtering
  const locations = ['All', ...new Set(allJobsData.map(job => job.location).filter(Boolean))];
  
  // Calculate total pages based on filtered jobs
  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  
  // Get current jobs for the current page
  const indexOfLastJob = currentPage * JOBS_PER_PAGE;
  const indexOfFirstJob = indexOfLastJob - JOBS_PER_PAGE;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  
  // Handle page navigation
  const goToPage = (pageNumber) => {
    setIsLoading(true);
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 600,
      behavior: 'smooth'
    });
    setTimeout(() => setIsLoading(false), 500);
  };
  
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };
  
  useEffect(() => {
    setIsLoading(true);
    // Filter jobs based on search term, category, and location
    const results = allJobsData.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           job.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || 
                             job.category === selectedCategory;
      
      const matchesLocation = selectedLocation === 'All' || 
                             job.location === selectedLocation;
      
      return matchesSearch && matchesCategory && matchesLocation;
    });
    
    setFilteredJobs(results);
    // Reset to first page when filters change
    setCurrentPage(1);
    setTimeout(() => setIsLoading(false), 300);
  }, [searchTerm, selectedCategory, selectedLocation, allJobsData]);

  // Add scrollbar-hide to body element
  useEffect(() => {
    document.body.classList.add('scrollbar-hide');
    return () => {
      document.body.classList.remove('scrollbar-hide');
    };
  }, []);

  const getCategoryIcon = (category) => {
    const icons = {
      'Security Engineering': Shield,
      'Penetration Testing': Target,
      'Security Analysis': Eye,
      'DevSecOps': Zap,
      'Security Consulting': Building,
      'default': Briefcase
    };
    return icons[category] || icons.default;
  };

  const getEmploymentTypeColor = (type) => {
    const colors = {
      'Full-time': 'bg-green-100 text-green-700 border-green-200',
      'Part-time': 'bg-blue-100 text-blue-700 border-blue-200',
      'Contract': 'bg-orange-100 text-orange-700 border-orange-200',
      'Internship': 'bg-purple-100 text-purple-700 border-purple-200',
      'default': 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return colors[type] || colors.default;
  };

  return (
    <main className="min-h-screen bg-white text-black font-sans overflow-x-hidden relative scrollbar-hide">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jobsJsonLd }}
      />
      {/* Brand Gradient/Glassy Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-1/2 w-[200vw] h-[200vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-600/10 via-brand-400/5 to-transparent rounded-full blur-3xl opacity-50" />
        {/* Glassy floating circle */}
        <div className="absolute -left-20 top-40 w-60 h-60 bg-white/10 rounded-full blur-2xl opacity-60 animate-float pointer-events-none" />
      </div>
      
      <div className="relative z-10">
        {/* Navbar */}
        <ClientOnly>
          <Navbar />
        </ClientOnly>

        {/* Hero Section */}
        <section className="relative pt-32 pb-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100/40 border border-brand-200 mb-8 text-lg"
              >
                <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse"></span>
                <span className="text-brand-600 text-sm font-medium">Join Our Team</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight"
              >
                Careers at <span className="text-brand-600">Captrit</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto mb-16 leading-relaxed"
              >
                Join our dynamic cybersecurity team and help protect the digital world. Explore exciting opportunities in security engineering, penetration testing, and cyber defense.
              </motion.p>

              {/* Search and Filter Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="max-w-4xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {/* Search Input */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="w-5 h-5 text-gray-400 group-focus-within:text-brand-400 transition-colors" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search jobs..."
                      className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm border border-white/20 rounded-xl text-text-primary placeholder-gray-400 focus:outline-none focus:border-brand-400/50 focus:ring-2 focus:ring-brand-400/20 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.10)]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Category Filter */}
                  <select
                    className="px-4 py-4 bg-white/90 backdrop-blur-sm border border-white/20 rounded-xl text-text-primary focus:outline-none focus:border-brand-400/50 focus:ring-2 focus:ring-brand-400/20 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.10)]"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category} className="bg-white">
                        {category}
                      </option>
                    ))}
                  </select>

                  {/* Location Filter */}
                  <select
                    className="px-4 py-4 bg-white/90 backdrop-blur-sm border border-white/20 rounded-xl text-text-primary focus:outline-none focus:border-brand-400/50 focus:ring-2 focus:ring-brand-400/20 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.10)]"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    {locations.map((location) => (
                      <option key={location} value={location} className="bg-white">
                        {location === 'All' ? 'All Locations' : location}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Jobs Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center items-center py-20"
                >
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-brand-400 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-3 h-3 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </motion.div>
              ) : allJobsData.length === 0 ? (
                <motion.div
                  key="no-openings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-20"
                >
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-brand-500/20 to-brand-600/20 rounded-full flex items-center justify-center">
                    <Briefcase className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-text-primary mb-2">No Open Positions Available</h3>
                  <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
                    We don't have any open positions at the moment, but we're always looking for talented cybersecurity professionals to join our team.
                  </p>
                  <div className="bg-gradient-to-r from-brand-50 to-brand-100/50 border border-brand-200 rounded-2xl p-6 max-w-2xl mx-auto">
                    <h4 className="text-lg font-semibold text-brand-700 mb-3">Interested in joining our team?</h4>
                    <p className="text-brand-600 mb-4">
                      Even though we don't have specific openings right now, we welcome speculative applications from passionate cybersecurity professionals.
                    </p>
                    <Link 
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Send us your resume
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ) : filteredJobs.length === 0 ? (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-20"
                >
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-brand-500/20 to-brand-600/20 rounded-full flex items-center justify-center">
                    <Briefcase className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-text-primary mb-2">No jobs found</h3>
                  <p className="text-text-secondary mb-4">Try changing your search or filter criteria</p>
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All');
                      setSelectedLocation('All');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-all duration-300"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="jobs"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-6xl mx-auto"
                >
                  {currentJobs.map((job, index) => {
                    const CategoryIcon = getCategoryIcon(job.category);
                    return (
                      <motion.div
                        key={job.id}
                        variants={cardVariants}
                        whileHover="hover"
                        className="group"
                      >
                        <Link href={`/careers/${job.id}`} className="block h-full">
                          <div className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-3xl overflow-hidden h-full transform transition-all duration-500 hover:border-brand-400/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15),0_8px_25px_rgba(0,0,0,0.10),0_0_0_1px_rgba(255,255,255,0.1)] shadow-[0_8px_32px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.04)]">
                            {/* Header */}
                            <div className="p-6 border-b border-gray-100">
                              <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-brand-500/10 to-brand-600/10 rounded-xl flex items-center justify-center">
                                  <CategoryIcon className="w-6 h-6 text-brand-600" />
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getEmploymentTypeColor(job.employmentType)}`}>
                                  {job.employmentType}
                                </span>
                              </div>
                              
                              <h2 className="text-xl font-black mb-3 text-text-primary group-hover:text-brand-600 transition-all duration-300 line-clamp-2 leading-tight tracking-tight">
                                {job.title}
                              </h2>
                              
                              <div className="flex items-center gap-4 text-sm text-text-secondary mb-3">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{job.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{job.date && format(new Date(job.date), 'MMM d, yyyy')}</span>
                                </div>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-grow flex flex-col">
                              <div className="flex-grow">
                                <p className="text-text-secondary text-sm mb-4 line-clamp-3 leading-relaxed font-medium">
                                  {job.excerpt}
                                </p>
                                
                                {/* Requirements Preview */}
                                {job.requirements && job.requirements.length > 0 && (
                                  <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-text-primary mb-2">Key Requirements:</h4>
                                    <ul className="space-y-1">
                                      {job.requirements.slice(0, 3).map((req, idx) => (
                                        <li key={idx} className="text-xs text-text-secondary flex items-center gap-2">
                                          <div className="w-1.5 h-1.5 bg-brand-400 rounded-full"></div>
                                          {req}
                                        </li>
                                      ))}
                                      {job.requirements.length > 3 && (
                                        <li className="text-xs text-brand-600 font-medium">
                                          +{job.requirements.length - 3} more requirements
                                        </li>
                                      )}
                                    </ul>
                                  </div>
                                )}
                              </div>
                              
                              {/* Apply Button */}
                              <div className="flex justify-end pt-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-brand-500/10 to-brand-600/10 rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-brand-500 group-hover:to-brand-600 transition-all duration-300 border border-brand-400/20 group-hover:border-brand-400/40 shadow-md">
                                  <svg className="w-4 h-4 text-brand-600 group-hover:text-white transition-all duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {filteredJobs.length > 0 && totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-16 flex justify-center"
              >
                <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl p-2 shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                      currentPage === 1 
                        ? 'border-white/20 text-white/40 cursor-not-allowed' 
                        : 'border-brand-400/30 text-brand-600 hover:bg-brand-500 hover:text-white hover:border-brand-500'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                  
                  {/* Page Numbers */}
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNumber;
                    
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }
                    
                    return (
                      <motion.button
                        key={pageNumber}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => goToPage(pageNumber)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                          currentPage === pageNumber 
                            ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg' 
                            : 'text-text-secondary hover:text-text-primary hover:bg-white/10'
                        }`}
                      >
                        {pageNumber}
                      </motion.button>
                    );
                  })}
                  
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                      currentPage === totalPages 
                        ? 'border-white/20 text-white/40 cursor-not-allowed' 
                        : 'border-brand-400/30 text-brand-600 hover:bg-brand-500 hover:text-white hover:border-brand-500'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-brand-50/50 via-white to-brand-100/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                Why Choose <span className="text-brand-600">Captrit</span>?
              </h2>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
                Join a team where innovation meets security, where your expertise is valued, and where you can make a real impact in protecting the digital world.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Professional Growth */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group"
              >
                <div className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-3xl p-8 h-full transform transition-all duration-500 hover:border-brand-400/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15),0_8px_25px_rgba(0,0,0,0.10)] shadow-[0_8px_32px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.04)]">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-4">Continuous Learning</h3>
                  <p className="text-text-secondary leading-relaxed">
                    Access to the latest cybersecurity tools, certifications, and training programs. Stay ahead of evolving threats with our comprehensive learning resources.
                  </p>
                </div>
              </motion.div>

              {/* Cutting-Edge Technology */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group"
              >
                <div className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-3xl p-8 h-full transform transition-all duration-500 hover:border-brand-400/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15),0_8px_25px_rgba(0,0,0,0.10)] shadow-[0_8px_32px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.04)]">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-4">Latest Technology</h3>
                  <p className="text-text-secondary leading-relaxed">
                    Work with state-of-the-art security tools and platforms. Experience the forefront of cybersecurity innovation with access to cutting-edge technologies.
                  </p>
                </div>
              </motion.div>

              {/* Work-Life Balance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="group"
              >
                <div className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-3xl p-8 h-full transform transition-all duration-500 hover:border-brand-400/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15),0_8px_25px_rgba(0,0,0,0.10)] shadow-[0_8px_32px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.04)]">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-4">Work-Life Balance</h3>
                  <p className="text-text-secondary leading-relaxed">
                    Flexible working arrangements, generous leave policies, and a supportive environment that values your well-being and personal growth.
                  </p>
                </div>
              </motion.div>

              {/* Competitive Compensation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="group"
              >
                <div className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-3xl p-8 h-full transform transition-all duration-500 hover:border-brand-400/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15),0_8px_25px_rgba(0,0,0,0.10)] shadow-[0_8px_32px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.04)]">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-4">Competitive Benefits</h3>
                  <p className="text-text-secondary leading-relaxed">
                    Attractive salary packages, comprehensive health insurance, performance bonuses, and additional perks that recognize your valuable contributions.
                  </p>
                </div>
              </motion.div>

              {/* Global Impact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="group"
              >
                <div className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-3xl p-8 h-full transform transition-all duration-500 hover:border-brand-400/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15),0_8px_25px_rgba(0,0,0,0.10)] shadow-[0_8px_32px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.04)]">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0-9H3" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-4">Global Impact</h3>
                  <p className="text-text-secondary leading-relaxed">
                    Work with international clients and make a real difference in protecting organizations worldwide. Your expertise helps secure the digital future.
                  </p>
                </div>
              </motion.div>

              {/* Team Culture */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="group"
              >
                <div className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-3xl p-8 h-full transform transition-all duration-500 hover:border-brand-400/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15),0_8px_25px_rgba(0,0,0,0.10)] shadow-[0_8px_32px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.04)]">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-500/10 to-brand-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-4">Collaborative Culture</h3>
                  <p className="text-text-secondary leading-relaxed">
                    Join a team of passionate cybersecurity professionals. Share knowledge, collaborate on challenging projects, and grow together in a supportive environment.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-center mt-16"
            >
              <div className="bg-gradient-to-r from-brand-600 to-brand-500 rounded-3xl p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                  Ready to Join Our Team?
                </h3>
                <p className="text-brand-100 text-lg mb-8 max-w-2xl mx-auto">
                  Explore our current openings and take the first step towards an exciting career in cybersecurity. Your expertise can make a difference.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-600 font-bold rounded-xl hover:bg-brand-50 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <span>{allJobsData.length} Open Positions</span>
                    <div className="w-2 h-2 bg-brand-600 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
} 