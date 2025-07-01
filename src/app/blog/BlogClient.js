'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
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

// Number of posts per page
const POSTS_PER_PAGE = 9;

export default function BlogClient({ allPostsData = [], categories = [], breadcrumbJsonLd, blogJsonLd }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(allPostsData);
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Extract unique years for filtering
  const years = ['All', ...new Set(allPostsData.map(post => new Date(post.date).getFullYear().toString()))];
  
  // Calculate total pages based on filtered posts
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  
  // Get current posts for the current page
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  
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
    // Filter posts based on search term, year, and category
    const results = allPostsData.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesYear = selectedYear === 'All' || 
                         new Date(post.date).getFullYear().toString() === selectedYear;
      
      const matchesCategory = selectedCategory === 'All' || 
                             post.category === selectedCategory;
      
      return matchesSearch && matchesYear && matchesCategory;
    });
    
    setFilteredPosts(results);
    // Reset to first page when filters change
    setCurrentPage(1);
    setTimeout(() => setIsLoading(false), 300);
  }, [searchTerm, selectedYear, selectedCategory, allPostsData]);

  return (
    <main className="min-h-screen bg-white text-black font-sans overflow-x-hidden relative" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: blogJsonLd }}
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
                <span className="text-brand-600 text-sm font-medium">Knowledge Center</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight"
              >
                Security <span className="text-brand-600">Blog</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto mb-16 leading-relaxed"
              >
                Insights, tips, and updates from our cybersecurity experts to help you keep your digital assets secure
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
                      <svg className="w-5 h-5 text-gray-400 group-focus-within:text-brand-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search articles..."
                      className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm border border-white/20 rounded-xl text-text-primary placeholder-gray-400 focus:outline-none focus:border-brand-400/50 focus:ring-2 focus:ring-brand-400/20 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.10)]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Year Filter */}
                  <select
                    className="px-4 py-4 bg-white/90 backdrop-blur-sm border border-white/20 rounded-xl text-text-primary focus:outline-none focus:border-brand-400/50 focus:ring-2 focus:ring-brand-400/20 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.10)]"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    {years.map((year) => (
                      <option key={year} value={year} className="bg-white">
                        {year === 'All' ? 'All Years' : year}
                      </option>
                    ))}
                  </select>

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
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts Section */}
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
              ) : filteredPosts.length === 0 ? (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-20"
                >
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-brand-500/20 to-brand-600/20 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-text-primary mb-2">No posts found</h3>
                  <p className="text-text-secondary">Try changing your search or filter criteria</p>
                </motion.div>
              ) : (
                <motion.div
                  key="posts"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-6xl mx-auto"
                >
                  {currentPosts.map((post, index) => (
                    <motion.div
                      key={post.slug}
                      variants={cardVariants}
                      whileHover="hover"
                      className="group"
                    >
                      <Link href={`/blog/${post.slug}`} className="block h-full">
                        <div className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-3xl overflow-hidden h-full transform transition-all duration-500 hover:border-brand-400/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15),0_8px_25px_rgba(0,0,0,0.10),0_0_0_1px_rgba(255,255,255,0.1)] shadow-[0_8px_32px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.04)]">
                          {/* Image Container */}
                          <div className="relative h-44 w-full overflow-hidden">
                            {post.cover ? (
                              /^https?:\/\//.test(post.cover) ? (
                                <img
                                  src={post.cover}
                                  alt={post.title}
                                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                              ) : (
                                <Image
                                  src={post.cover.startsWith('/') ? post.cover : `/images/blog/${post.cover}`}
                                  alt={post.title}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                              )
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-brand-500/20 via-brand-400/15 to-brand-600/25 flex items-center justify-center">
                                <svg className="w-16 h-16 text-brand-400/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                              </div>
                            )}
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                            
                            {/* Date Badge */}
                            <div className="absolute bottom-4 left-4 bg-brand-500/95 backdrop-blur-md text-xs font-bold text-white px-4 py-2 rounded-2xl shadow-lg border border-white/20">
                              {post.date && format(new Date(post.date), 'MMM d, yyyy')}
                            </div>

                            {/* Category Badge */}
                            {post.category && (
                              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-xs font-semibold text-text-primary px-3 py-1.5 rounded-xl shadow-md border border-white/30">
                                {post.category}
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-6 flex-grow flex flex-col">
                            <div className="flex-grow">
                              <h2 className="text-xl font-black mb-3 text-text-primary group-hover:text-brand-600 transition-all duration-300 line-clamp-2 leading-tight tracking-tight">
                                {post.title}
                              </h2>
                              <p className="text-text-secondary text-sm mb-4 line-clamp-3 leading-relaxed font-medium">
                                {post.excerpt}
                              </p>
                            </div>
                            
                            {/* Read More Arrow */}
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
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {filteredPosts.length > 0 && totalPages > 1 && (
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

        <Footer />
      </div>
      
      <style jsx global>{`
        html {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        html::-webkit-scrollbar {
          display: none;
        }
        body {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        body::-webkit-scrollbar {
          display: none;
        }
        * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        *::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
} 