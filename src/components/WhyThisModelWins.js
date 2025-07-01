'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, Zap, Users, Clock, Shield, Sparkles } from 'lucide-react';

const DiagonalCard = ({ icon: Icon, title, description, isPositive = false, position = "left", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: position === "left" ? -100 : 100, y: 50, rotate: position === "left" ? -5 : 5 }}
    whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
    transition={{ duration: 0.8, delay, type: 'spring', bounce: 0.4 }}
    className={`relative group ${position === "left" ? "lg:col-span-1" : "lg:col-span-1"}`}
  >
    <div className={`relative p-6 rounded-2xl border-2 transition-all duration-700 group-hover:scale-105 group-hover:rotate-1 ${
      isPositive 
        ? 'border-teal-200/60 bg-gradient-to-br from-teal-50/80 via-cyan-50/60 to-teal-100/40 hover:border-teal-300/70 hover:shadow-[0_0_30px_rgba(20,184,166,0.2)]' 
        : 'border-brand-200/60 bg-gradient-to-br from-brand-50/80 via-blue-50/60 to-brand-100/40 hover:border-brand-300/70 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]'
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-full opacity-5 ${
          isPositive ? 'bg-teal-500' : 'bg-brand-500'
        }`} style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, ${isPositive ? '#14b8a6' : '#3b82f6'} 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, ${isPositive ? '#0d9488' : '#1d4ed8'} 0%, transparent 50%)`
        }} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className={`relative p-3 rounded-xl ${
            isPositive ? 'bg-gradient-to-br from-teal-500 to-teal-600' : 'bg-gradient-to-br from-brand-500 to-brand-600'
          } text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-5 h-5" />
            <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
              isPositive ? 'bg-teal-300' : 'bg-brand-300'
            } animate-pulse`} />
          </div>
          <h3 className={`text-lg font-bold ${
            isPositive ? 'text-teal-900' : 'text-brand-900'
          } group-hover:scale-105 transition-transform duration-300`}>
            {title}
          </h3>
        </div>
        <p className={`text-sm leading-relaxed font-medium ${
          isPositive ? 'text-teal-800' : 'text-brand-800'
        }`}>
          {description}
        </p>
      </div>
    </div>
  </motion.div>
);

const HexagonFeature = ({ icon: Icon, title, description, gradient, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.8 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.8, delay, type: 'spring', bounce: 0.5 }}
    className="group relative"
  >
    <div className="relative">
      {/* Hexagon Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:-translate-y-3" />
      
      <div className="relative p-8">
        <div className="flex items-start gap-6">
          <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-xl group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-8 h-8" />
            <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-yellow-300 animate-pulse" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-black text-text-primary mb-3 group-hover:text-brand-700 transition-colors duration-300">{title}</h4>
            <p className="text-text-secondary text-base leading-relaxed font-medium">{description}</p>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const WhyThisModelWins = () => {
  const traditionalProblems = [
    {
      icon: Users,
      title: "In-House Hiring",
      description: "Expensive, fixed scope, delays if they resign"
    },
    {
      icon: XCircle,
      title: "Freelancers", 
      description: "Narrow focus, no flexibility, scope-only"
    },
    {
      icon: Clock,
      title: "Agencies",
      description: "Rigid cycles, poor integration, high cost"
    }
  ];

  const ourAdvantages = [
    {
      icon: Shield,
      title: "One subscription, many engineers",
      description: "No need to retrain or hire specialists"
    },
    {
      icon: Zap,
      title: "Predictable pricing by hours",
      description: "Transparent, controllable costs"
    },
    {
      icon: ArrowRight,
      title: "Work aligned to your sprint cycles",
      description: "Results delivered when you need them"
    }
  ];

  return (
    <section className="py-32 bg-white relative min-h-screen overflow-hidden">
      {/* Radical Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header with Radical Design */}
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, type: 'spring', bounce: 0.6 }}
          className="text-center mb-24 relative"
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
              <span className="text-sm font-semibold text-brand-800 tracking-wide">Why This Model Wins</span>
            </motion.span>
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl font-black text-text-primary mb-6"
          >
            The <span className="text-brand-600">Revolutionary</span> Approach
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto"
          >
            Traditional security models are broken. Here's why our approach is the future.
          </motion.p>
        </motion.div>

        {/* Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-32">
          
          {/* Traditional Problems - Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2, type: 'spring', bounce: 0.4 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="text-center mb-12">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-brand-50 to-blue-50 rounded-full border-2 border-brand-200 shadow-lg"
              >
                <XCircle className="w-6 h-6 text-brand-500" />
                <span className="text-lg font-black text-brand-700">TRADITIONAL = BROKEN</span>
              </motion.div>
            </div>
            
            <div className="space-y-6">
              {traditionalProblems.map((problem, index) => (
                <DiagonalCard
                  key={problem.title}
                  icon={problem.icon}
                  title={problem.title}
                  description={problem.description}
                  isPositive={false}
                  position="left"
                  delay={index * 0.2}
                />
              ))}
            </div>
          </motion.div>

          {/* Center Divider */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-2 flex items-center justify-center"
          >
            <div className="relative">
              <div className="w-1 h-96 bg-gradient-to-b from-brand-500 via-brand-400 to-teal-500 rounded-full shadow-2xl" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border-4 border-brand-500 shadow-xl flex items-center justify-center">
                <Zap className="w-4 h-4 text-brand-600" />
              </div>
            </div>
          </motion.div>

          {/* Our Advantages - Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotate: 5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4, type: 'spring', bounce: 0.4 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="text-center mb-12">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-full border-2 border-teal-200 shadow-lg"
              >
                <CheckCircle className="w-6 h-6 text-teal-500" />
                <span className="text-lg font-black text-teal-700">OUR MODEL = FUTURE</span>
              </motion.div>
            </div>
            
            <div className="space-y-6">
              {ourAdvantages.map((advantage, index) => (
                <DiagonalCard
                  key={advantage.title}
                  icon={advantage.icon}
                  title={advantage.title}
                  description={advantage.description}
                  isPositive={true}
                  position="right"
                  delay={index * 0.2}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Feature Highlights - Hexagon Style */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, type: 'spring', bounce: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <HexagonFeature
            icon={Users}
            title="Team Flexibility"
            description="Access to multiple specialists without the overhead of managing a full team."
            gradient="from-brand-500 to-brand-600"
            delay={0.1}
          />
          <HexagonFeature
            icon={Zap}
            title="Speed & Efficiency"
            description="Parallel execution with multiple engineers working simultaneously on your priorities."
            gradient="from-amber-500 to-orange-500"
            delay={0.2}
          />
          <HexagonFeature
            icon={Shield}
            title="Predictable Results"
            description="Clear deliverables, transparent pricing, and sprint-aligned delivery cycles."
            gradient="from-emerald-500 to-teal-500"
            delay={0.3}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default WhyThisModelWins; 