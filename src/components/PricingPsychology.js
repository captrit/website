'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Zap, Users, Clock, TrendingUp, Brain, Lightbulb, Target, ArrowRight } from 'lucide-react';

const PsychologyCard = ({ icon: Icon, title, description, gradient, delay = 0, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, type: 'spring', bounce: 0.4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative cursor-pointer"
    >
      <div className={`relative p-8 rounded-3xl border-2 transition-all duration-700 ${
        isHovered ? 'scale-105 -translate-y-3' : ''
      } bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md border-white/30 shadow-xl hover:shadow-2xl`}>
        
        {/* Animated Background */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${gradient} transition-all duration-500 ${
            isHovered ? 'opacity-20 scale-110' : ''
          }`} />
        </div>

        {/* Floating Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
          className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full border-2 border-brand-200 shadow-lg flex items-center justify-center"
        >
          <span className="text-sm font-black text-brand-600">{index + 1}</span>
        </motion.div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-xl group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="w-6 h-6" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-white/30 rounded-full animate-pulse" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-black text-text-primary mb-2 group-hover:text-brand-700 transition-colors duration-300">
                {title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-text-secondary text-base leading-relaxed font-medium">
            {description}
          </p>

          {/* Hover Arrow */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute bottom-4 right-4"
              >
                <ArrowRight className="w-5 h-5 text-brand-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const PricingPsychology = () => {
  const psychologyData = [
    {
      icon: DollarSign,
      title: "Half-the-Cost Effect",
      description: "Why hire one engineer when you can get a whole security team — for half the price?",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: Brain,
      title: "Blended Hour Rate",
      description: "You're not paying per engineer. You're paying for rapid, high-quality results, billed only on used time.",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      icon: Target,
      title: "Zero-Waste Framing",
      description: "We never bill by headcount. Whether 2 engineers or 10 — you only pay for results within your allocated hours.",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: Zap,
      title: "Speed Advantage",
      description: "More engineers, parallel delivery — no bottlenecks. We help you fix issues in days, not quarters.",
      gradient: "from-brand-500 to-cyan-500"
    }
  ];

  return (
    <section className="py-24 bg-white relative min-h-screen">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
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
              <span className="text-sm font-semibold text-brand-800 tracking-wide">Pricing Strategy</span>
            </motion.span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-6">
            Why This <span className="text-brand-600">Pricing</span> Works
          </h2>
          
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            Understanding the strategy behind our pricing model and why it's more effective than traditional approaches.
          </p>
        </motion.div>

        {/* Psychology Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {psychologyData.map((item, index) => (
            <PsychologyCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
              gradient={item.gradient}
              delay={index * 0.2}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPsychology; 