'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Bug, Wrench, FileText, MessageSquare, ChevronRight, ChevronDown } from 'lucide-react';

const steps = [
  { 
    icon: <Search className="w-6 h-6 text-white" strokeWidth={2} />, 
    title: 'Mapping', 
    description: 'Architecture, risks, and repo scanning',
    gradient: 'from-blue-500 to-cyan-600',
    delay: 0.1
  },
  { 
    icon: <Bug className="w-6 h-6 text-white" strokeWidth={2} />, 
    title: 'Testing', 
    description: 'App + cloud testing before production',
    gradient: 'from-amber-500 to-orange-600',
    delay: 0.2
  },
  { 
    icon: <Wrench className="w-6 h-6 text-white" strokeWidth={2} />, 
    title: 'Patch Advisory', 
    description: 'Fix guidance, PR reviews, and hardening',
    gradient: 'from-purple-500 to-indigo-600',
    delay: 0.3
  },
  { 
    icon: <FileText className="w-6 h-6 text-white" strokeWidth={2} />, 
    title: 'Report & Demo', 
    description: 'Dev-readable PDF + demo walkthrough',
    gradient: 'from-emerald-500 to-teal-600',
    delay: 0.4
  },
  { 
    icon: <MessageSquare className="w-6 h-6 text-white" strokeWidth={2} />, 
    title: 'Ongoing Support', 
    description: 'Slack support, compliance',
    gradient: 'from-brand-500 to-brand-600',
    delay: 0.5
  },
];

const StepCard = ({ step, index, isMobile = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        y: isInView ? 0 : 20 
      }}
      transition={{ 
        duration: 0.5, 
        delay: step.delay,
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={`relative group ${isMobile ? 'w-full' : 'flex-1 max-w-[220px]'}`}
    >
      <div className={`
        h-full flex flex-col bg-white/90 backdrop-blur-sm rounded-3xl p-6
        border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.12),0_15px_50px_rgba(0,0,0,0.08)] 
        transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(0,0,0,0.15),0_25px_70px_rgba(0,0,0,0.1)]
        ${isMobile ? 'items-start' : 'items-center text-center'}
      `}>
        {/* Icon Container */}
        <div className="flex-1 flex flex-col justify-center items-center h-full">
          <div className="flex flex-col items-center">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.gradient} p-3 text-white shadow-md flex items-center justify-center mb-4 flex-shrink-0`}>
              {step.icon}
            </div>
            
            <div className={`${isMobile ? '' : 'px-2'}`}>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 leading-normal">
                {step.description}
              </p>
            </div>
          </div>
        </div>
        
        {/* Step number */}
        <div className={`
          absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-600 
          flex items-center justify-center text-white text-xs font-medium
          ${isMobile ? 'hidden' : 'flex'}
        `}>
          {index + 1}
        </div>
      </div>
    </motion.div>
  );
};

const DottedConnector = ({ isMobile = false, isLast = false }) => {
  if (isMobile) {
    return (
      <div className="flex items-center justify-center py-0">
        <div className="w-0.5 h-6 relative">
          <div className="absolute inset-0 bg-brand-300" style={{
            backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 3px, #3b82f6 3px, #3b82f6 6px)',
          }}></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="hidden lg:flex items-center justify-center px-2 relative">
      <div className="h-0.5 w-12 relative">
        <div className="absolute inset-0 bg-brand-300" style={{
          backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 3px, #3b82f6 3px, #3b82f6 6px)',
        }}></div>
      </div>
    </div>
  );
};

export default function SecuritySprintProcess() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-50px" });

  return (
    <section className="relative py-16 sm:py-20 bg-white">
      {/* Brand Gradient Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 w-[200vw] h-[200vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-600/10 via-brand-400/5 to-transparent rounded-full blur-3xl opacity-50" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
              <span className="text-sm font-semibold text-brand-800 tracking-wide">Our Process</span>
            </motion.span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Security <span className="text-brand-600">Sprint</span> Process
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            A streamlined approach to securing your applications and infrastructure
          </p>
        </motion.div>
        
        {/* Mobile View - Vertical with dotted connections */}
        <div className="md:hidden -mx-4 px-4">
          <div className="space-y-0">
            {steps.map((step, i) => (
              <React.Fragment key={`mobile-${i}`}>
                <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-3xl p-4 border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                  <div className="flex-shrink-0 mr-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.gradient} p-3 text-white shadow-md flex items-center justify-center`}>
                      {step.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 truncate">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      {step.description}
                    </p>
                  </div>
                  <div className="ml-2 w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-medium">
                    {i + 1}
                  </div>
                </div>
                {/* Mobile dotted connector */}
                {i < steps.length - 1 && <DottedConnector isMobile={true} />}
                {/* Loop back connector for mobile */}
                {i === steps.length - 1 && (
                  <div className="flex items-center justify-center py-3">
                    <div className="flex flex-col items-center">
                      <div className="h-4 w-0.5 relative mb-1">
                        <div className="absolute inset-0 bg-brand-300" style={{
                          backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 2px, #3b82f6 2px, #3b82f6 4px)',
                        }}></div>
                      </div>
                      <div className="text-xs text-brand-500 font-medium px-2 py-1 bg-brand-50 rounded-full">
                        Loop
                      </div>
                      <div className="h-4 w-0.5 relative mt-1">
                        <div className="absolute inset-0 bg-brand-300" style={{
                          backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 2px, #3b82f6 2px, #3b82f6 4px)',
                        }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {/* Desktop View */}
        <div className="hidden md:block">
          <div 
            ref={containerRef}
            className="relative"
          >
            {/* Main container for cards */}
            <div className="flex items-stretch justify-center flex-wrap relative">
              {steps.map((step, i) => (
                <React.Fragment key={`desktop-${i}`}>
                  <div className="flex-1 max-w-[220px] h-full">
                    <div className="h-[220px] w-full flex flex-col">
                      <StepCard 
                        step={step} 
                        index={i}
                        isMobile={false}
                      />
                    </div>
                  </div>
                  {/* Dotted connectors between adjacent cards */}
                  {i < steps.length - 1 && <DottedConnector />}
                </React.Fragment>
              ))}
            </div>
            
            {/* Dotted line with connecting lines and arrows - positioned higher */}
            <div className="absolute left-0 w-full pointer-events-none" style={{ top: 'calc(100% + 5px)' }}>
              <svg width="100%" height="30" className="overflow-visible">
                {/* Main dotted line */}
                <line 
                  x1="10%" y1="15" x2="90%" y2="15" 
                  stroke="#3b82f6" 
                  strokeWidth="1.5" 
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                  className="opacity-60"
                />
                
                {/* Left connecting line to first card */}
                <line 
                  x1="10%" y1="0" x2="10%" y2="15" 
                  stroke="#3b82f6" 
                  strokeWidth="1.5" 
                  className="opacity-60"
                />
                
                {/* Right connecting line to fifth card */}
                <line 
                  x1="90%" y1="0" x2="90%" y2="15" 
                  stroke="#3b82f6" 
                  strokeWidth="1.5" 
                  className="opacity-60"
                />
                
                {/* Arrow head at first card */}
                <path 
                  d="M 10% 10 L 12% 15 L 10% 20 Z" 
                  fill="#3b82f6" 
                  className="opacity-60"
                />
                
                {/* Arrow head at fifth card */}
                <path 
                  d="M 90% 10 L 88% 15 L 90% 20 Z" 
                  fill="#3b82f6" 
                  className="opacity-60"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}