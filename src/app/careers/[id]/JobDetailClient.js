'use client';

import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  Building,
  Zap,
  Shield,
  Target,
  Eye,
  Lock,
  ArrowLeft,
  Upload,
  Send,
  CheckCircle,
  AlertCircle,
  Calendar,
  DollarSign
} from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ClientOnly from '../../../components/ClientOnly';

export default function JobDetailClient({ jobData, breadcrumbJsonLd, jobPostingJsonLd }) {
  console.log('JobDetailClient received jobData:', jobData);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    coverLetter: '',
    experience: '',
    whyJoin: ''
  });
  const [resumeFile, setResumeFile] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    } else {
      alert('Please upload a PDF file for your resume.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formDataToSend = new FormData();
      
      // Add form fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      // Add job information
      formDataToSend.append('jobTitle', jobData.title);
      formDataToSend.append('jobId', jobData.id);
      formDataToSend.append('jobCategory', jobData.category);
      formDataToSend.append('jobLocation', jobData.location);
      
      // Add resume file
      if (resumeFile) {
        formDataToSend.append('resume', resumeFile);
      }

      const response = await fetch('/api/apply', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form after success
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            linkedin: '',
            portfolio: '',
            coverLetter: '',
            experience: '',
            whyJoin: ''
          });
          setResumeFile(null);
          setSubmitStatus(null);
        }, 3000);
      } else {
        const errorData = await response.json();
        setSubmitStatus('error');
        console.error('Form submission error:', errorData);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Network error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const CategoryIcon = getCategoryIcon(jobData.category);

  return (
    <main className="min-h-screen bg-white text-black font-sans overflow-x-hidden relative scrollbar-hide">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jobPostingJsonLd }}
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

        {/* Back to Careers */}
        <section className="relative pt-32 pb-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link 
                href="/careers"
                className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Careers</span>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Job Details Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Job Details */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.04)]"
                >
                  {/* Job Header */}
                  <div className="mb-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-brand-500/10 to-brand-600/10 rounded-2xl flex items-center justify-center">
                        <CategoryIcon className="w-8 h-8 text-brand-600" />
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getEmploymentTypeColor(jobData.employmentType || jobData.type)}`}>
                        {jobData.employmentType || jobData.type}
                      </span>
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl font-black text-text-primary mb-4 leading-tight">
                      {jobData.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-6 text-sm text-text-secondary mb-6">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{jobData.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Posted {jobData.date && format(new Date(jobData.date), 'MMM d, yyyy')}</span>
                      </div>
                      {jobData.salary && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          <span>{jobData.salary}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="prose prose-lg max-w-none mb-8">
                    <div className="text-text-secondary leading-relaxed" 
                         dangerouslySetInnerHTML={{ __html: jobData.content }} />
                  </div>

                  {/* Requirements */}
                  {jobData.requirements && jobData.requirements.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-text-primary mb-4">Requirements</h3>
                      <ul className="space-y-3">
                        {jobData.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-text-secondary">
                            <div className="w-2 h-2 bg-brand-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Responsibilities */}
                  {jobData.responsibilities && jobData.responsibilities.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-text-primary mb-4">Responsibilities</h3>
                      <ul className="space-y-3">
                        {jobData.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-text-secondary">
                            <div className="w-2 h-2 bg-brand-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Benefits */}
                  {jobData.benefits && jobData.benefits.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-text-primary mb-4">Benefits</h3>
                      <ul className="space-y-3">
                        {jobData.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-text-secondary">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Application Form */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.04)] sticky top-32"
                >
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-text-primary mb-2">Apply for this position</h3>
                    <p className="text-sm text-text-secondary">Join our cybersecurity team and make a difference</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all shadow-sm hover:shadow-md"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all shadow-sm hover:shadow-md"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all shadow-sm hover:shadow-md"
                        placeholder="+971 50 123 4567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn Profile</label>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all shadow-sm hover:shadow-md"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Portfolio/Website</label>
                      <input
                        type="url"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all shadow-sm hover:shadow-md"
                        placeholder="https://yourportfolio.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Resume/CV *</label>
                      <div className="relative">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileChange}
                          required
                          className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all shadow-sm hover:shadow-md file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100"
                        />
                        <Upload className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">PDF format only, max 5MB</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Letter</label>
                      <textarea
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all shadow-sm hover:shadow-md resize-none"
                        placeholder="Tell us why you're interested in this position..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Relevant Experience</label>
                      <textarea
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all shadow-sm hover:shadow-md resize-none"
                        placeholder="Briefly describe your relevant experience..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Why Join Captrit?</label>
                      <textarea
                        name="whyJoin"
                        value={formData.whyJoin}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all shadow-sm hover:shadow-md resize-none"
                        placeholder="What excites you about joining our team?"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full group relative inline-flex items-center justify-center px-6 py-4 text-base font-bold text-white transition-all duration-300 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 rounded-xl shadow-lg hover:shadow-xl hover:shadow-brand-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Submitting...</span>
                        </div>
                      ) : submitStatus === 'success' ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          <span>Application Sent!</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          <span>Submit Application</span>
                        </div>
                      )}
                    </motion.button>

                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Thank you! We'll review your application and get back to you soon.</span>
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
                      >
                        <AlertCircle className="w-4 h-4" />
                        <span>Sorry, there was an error sending your application. Please try again.</span>
                      </motion.div>
                    )}
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
} 