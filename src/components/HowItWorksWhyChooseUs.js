'use client';
import { motion } from 'framer-motion';

export default function HowItWorksWhyChooseUs() {
  const benefits = [
    {
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Cost Efficient',
      description: 'More affordable than hiring full-time security experts.',
      gradient: 'from-emerald-400 to-teal-500',
    },
    {
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Lightning Fast',
      description: 'Faster turnaround than traditional security audits.',
      gradient: 'from-amber-400 to-orange-500',
    },
    {
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'True Partnership',
      description: 'Real collaboration with your development team.',
      gradient: 'from-purple-400 to-indigo-500',
    },
    {
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Global Reach',
      description: '24/7 support across all time zones worldwide.',
      gradient: 'from-blue-400 to-cyan-500',
    },
    {
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Secure by Design',
      description: 'Proactive security architecture, not just bug hunting.',
      gradient: 'from-brand-400 to-brand-600',
    }
  ];
  
  return (
    <section className="relative bg-white py-20 md:py-24 lg:py-32 overflow-hidden">
      {/* Polished Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand-50/30" />
        <motion.div
          animate={{
            transform: [
              'translate(20%, -20%) scale(1) rotate(0deg)',
              'translate(-20%, 20%) scale(1.2) rotate(90deg)',
              'translate(20%, -20%) scale(1) rotate(180deg)',
            ]
          }}
          transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-brand-100 to-transparent rounded-full opacity-60 blur-3xl"
        />
        <motion.div
          animate={{
            transform: [
              'translate(-20%, 20%) scale(1.2) rotate(0deg)',
              'translate(20%, -20%) scale(1) rotate(-90deg)',
              'translate(-20%, 20%) scale(1.2) rotate(-180deg)',
            ]
          }}
          transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut', delay: 10 }}
          className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-brand-200 to-transparent rounded-full opacity-50 blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Polished Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20 lg:mb-24"
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
              <span className="text-sm font-semibold text-brand-800 tracking-wide">Why Teams Choose Us</span>
            </motion.span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-4">
            An <span className="text-brand-600">Extension</span> of Your Team
          </h2>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            We work as a dedicated part of your development process, providing the expertise of a full-scale security team without the overhead.
          </p>
        </motion.div>

        {/* Symmetric Benefits Layout */}
        <div className="mt-16 lg:mt-24">
          {/* Mobile: Vertical Flex Layout */}
          <div className="lg:hidden flex flex-col items-center gap-10">
            {benefits.map((benefit, index) => (
              <BenefitElement
                key={index}
                benefit={benefit}
              />
            ))}
          </div>

          {/* Desktop: Symmetric Layout */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-x-8 xl:gap-x-16">
            {/* Left Cards */}
            <div className="space-y-16">
              <motion.div 
                initial={{ opacity: 0, x: -50 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.7, delay: 0.4 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <BenefitElement benefit={benefits[0]} />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -50 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.7, delay: 0.6 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <BenefitElement benefit={benefits[1]} />
              </motion.div>
            </div>

            {/* Middle Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <BenefitElement benefit={benefits[2]} />
              
              {/* Connection Lines */}
              <motion.div 
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: [0.3, 1, 0.3] }}
                transition={{ 
                  scaleX: { duration: 0.7, delay: 0.8 },
                  opacity: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
                }}
                className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-full w-8 xl:w-16 h-0.5 bg-brand-300 origin-left"
              />
              <motion.div 
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: [0.3, 1, 0.3] }}
                transition={{ 
                  scaleX: { duration: 0.7, delay: 0.8 },
                  opacity: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
                }}
                className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-full w-8 xl:w-16 h-0.5 bg-brand-300 origin-right"
              />
            </motion.div>

            {/* Right Cards */}
            <div className="space-y-16">
              <motion.div 
                initial={{ opacity: 0, x: 50 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.7, delay: 0.4 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <BenefitElement benefit={benefits[3]} />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 50 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.7, delay: 0.6 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <BenefitElement benefit={benefits[4]} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitElement({ benefit }) {
  return (
    <div className="relative w-full max-w-sm">
      <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/60 transition-all duration-300 group-hover:shadow-xl group-hover:border-brand-200">
        <div className="flex items-start gap-5">
          {/* Icon */}
          <div className={`relative flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.gradient} p-3 text-white shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
            {benefit.icon}
          </div>
          
          {/* Text Content */}
          <div className="flex-grow">
            <h3 className="text-xl font-bold text-slate-800 mb-2 transition-colors duration-300 group-hover:text-brand-700">
              {benefit.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {benefit.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}