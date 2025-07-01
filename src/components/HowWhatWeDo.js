'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaCodeBranch, FaUsers, FaShieldAlt, FaPuzzlePiece } from 'react-icons/fa';
import { SiJira, SiSlack, SiGithub } from 'react-icons/si';

const Timeline = () => (
  <div className="relative py-6">
    <div className="flex items-center justify-between">
      <div className="flex flex-col items-center gap-2">
        <div className="w-4 h-4 bg-brand-500 rounded-full"></div>
        <span className="text-sm text-brand-600 font-medium">Dev Start</span>
      </div>
      <div className="flex-1 h-0.5 bg-gradient-to-r from-brand-500 to-cyan-500 mx-6 relative">
        <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-500 rounded-full"></div>
        <div className="absolute top-1/2 left-2/4 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-500 rounded-full"></div>
        <div className="absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-500 rounded-full"></div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="w-4 h-4 bg-cyan-500 rounded-full"></div>
        <span className="text-sm text-cyan-600 font-medium">Production</span>
      </div>
    </div>
  </div>
);

const FeatureBlock = ({ icon: Icon, title, description, gradient, className = "" }) => (
  <div className={`bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12),0_15px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.15),0_25px_70px_rgba(0,0,0,0.1)] transition-all duration-300 border border-white/20 relative overflow-hidden group ${className}`}>
    <div className="relative z-10">
      <div className="flex items-start gap-5">
        <div className={`relative flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 border border-white/20`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-text-primary mb-2 transition-colors duration-300 group-hover:text-brand-700">
            {title}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed font-medium">
            {description}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const IntegrationSection = () => (
  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12),0_15px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.15),0_25px_70px_rgba(0,0,0,0.1)] transition-all duration-300 border border-white/20 relative overflow-hidden h-full group">
    <div className="relative z-10">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-text-primary mb-4 transition-colors duration-300 group-hover:text-brand-700">Seamless Workflow Integration</h3>
        <div className="flex justify-center items-center gap-6 mb-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl flex items-center justify-center shadow-sm">
              <SiGithub className="text-text-primary text-lg" />
            </div>
            <div className="w-2 h-2 bg-brand-600 rounded-full"></div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl flex items-center justify-center shadow-sm">
              <SiSlack className="text-purple-600 text-lg" />
            </div>
            <div className="w-2 h-2 bg-brand-600 rounded-full"></div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl flex items-center justify-center shadow-sm">
              <SiJira className="text-indigo-600 text-lg" />
            </div>
            <div className="w-2 h-2 bg-brand-600 rounded-full"></div>
          </div>
        </div>
        <p className="text-sm text-text-secondary max-w-sm mx-auto leading-relaxed mb-4 font-medium">
          We plug into your existing tools — security becomes invisible
        </p>
      </div>
      <Timeline />
    </div>
  </div>
);

const HowWhatWeDo = () => {
  return (
    <section className="py-24 bg-white relative min-h-screen">
      {/* Brand Gradient Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 w-[200vw] h-[200vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-600/10 via-brand-400/5 to-transparent rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-6">
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/70 backdrop-blur-md rounded-full shadow-md border border-gray-200/80 cursor-pointer"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
              </span>
              <span className="text-sm font-semibold text-brand-800 tracking-wide">What We Do</span>
            </motion.span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-4">
            Security at <span className="text-brand-600">Dev Speed</span>
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            We're not just testers. We're your embedded security partners, working with your team from day 0 to post-production.
          </p>
        </motion.div>

        {/* Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Two stacked features */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col space-y-8"
          >
            <motion.div whileHover={{ y: -8 }} className="group flex-grow">
              <FeatureBlock
                icon={FaCodeBranch}
                title="Proactive Security Visibility"
                description="Stay ahead with live updates and prioritized actions — no waiting for reports."
                gradient="from-emerald-500 to-teal-500"
                className="h-full"
              />
            </motion.div>
            <motion.div whileHover={{ y: -8 }} className="group flex-grow">
              <FeatureBlock
                icon={FaUsers}
                title="Dedicated Security Engineers"
                description="We embed directly into your product team during dev and post-prod."
                gradient="from-amber-500 to-orange-500"
                className="h-full"
              />
            </motion.div>
          </motion.div>

          {/* Right Column - Integration Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-7"
          >
            <IntegrationSection />
          </motion.div>

          {/* Bottom Row - Asymmetric layout */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.6 }}
            className="lg:col-span-4"
          >
            <motion.div whileHover={{ y: -8 }} className="group h-full">
              <FeatureBlock
                icon={FaPuzzlePiece}
                title="Developer-Aligned Support"
                description="We speak code and work alongside your developers, not against them."
                className="h-full"
                gradient="from-brand-500 to-cyan-500"
              />
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.8 }}
            className="lg:col-span-8"
          >
            <motion.div whileHover={{ y: -8 }} className="group h-full">
              <FeatureBlock
                icon={FaShieldAlt}
                title="Ongoing Security Strategy"
                description="Continuous security monitoring and improvement for your entire development lifecycle."
                className="h-full"
                gradient="from-purple-500 to-indigo-500"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowWhatWeDo;