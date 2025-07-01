"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Search, Zap, FileText } from 'lucide-react';

// IconWrapper from WhyChooseUs.js
const IconWrapper = ({ children, bgGradient = 'from-brand-500 to-brand-600' }) => (
  <div className={`p-3 rounded-2xl bg-gradient-to-br ${bgGradient} w-14 h-14 flex items-center justify-center`}>
    {children}
  </div>
);

// FeatureCard from WhyChooseUs.js (simplified, no badge/stat)
const FeatureCard = ({ title, description, icon, bgGradient }) => (
  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12),0_15px_50px_rgba(0,0,0,0.08)] h-full transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(0,0,0,0.15),0_25px_70px_rgba(0,0,0,0.1)] border border-white/20">
    <div className="flex items-start gap-4">
      <IconWrapper bgGradient={bgGradient}>{icon}</IconWrapper>
      <div>
        <h4 className="text-xl font-bold text-text-primary mb-1">{title}</h4>
        <p className="text-text-secondary text-base leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

const features = [
  {
    title: "Offensive Security",
    description: "Red teaming, VAPT & real-world attack simulation for SaaS & startups.",
    icon: <Zap className="w-6 h-6 text-white" strokeWidth={2} />, 
    bgGradient: 'from-brand-500 to-brand-600'
  },
  {
    title: "Embedded Security Engineers",
    description: "Our experts work alongside your dev team, every sprint.",
    icon: <FileText className="w-6 h-6 text-white" strokeWidth={2} />, 
    bgGradient: 'from-emerald-400 to-emerald-600'
  },
  {
    title: "Continuous Partnership",
    description: "Ongoing support, not just one-time tests or reports.",
    icon: <Globe className="w-6 h-6 text-white" strokeWidth={2} />, 
    bgGradient: 'from-teal-400 to-teal-600'
  },
  {
    title: "UAE-Based, Global Standards",
    description: "Local expertise, international compliance & best practices.",
    icon: <Search className="w-6 h-6 text-white" strokeWidth={2} />, 
    bgGradient: 'from-amber-400 to-amber-600'
  },
  {
    title: "Dev-First Approach",
    description: "Security that fits your stack and workflow.",
    icon: <Zap className="w-6 h-6 text-white" strokeWidth={2} />, 
    bgGradient: 'from-orange-400 to-orange-600'
  },
  {
    title: "Proactive Monitoring",
    description: "Real-time risk detection and rapid response.",
    icon: <Globe className="w-6 h-6 text-white" strokeWidth={2} />, 
    bgGradient: 'from-purple-400 to-purple-600'
  }
];

const AboutExpertiseSection = () => (
  <section className="py-24 bg-white relative">
    {/* Brand Gradient Background from WhyChooseUs.js */}
    <div
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute left-1/2 top-1/2 w-[200vw] h-[200vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-600/10 via-brand-400/5 to-transparent rounded-full blur-3xl opacity-50" />
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-4xl mx-auto mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">Expertise</span>
        </h2>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Empowering businesses with advanced cybersecurity solutions and strategic digital transformation
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <FeatureCard
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              bgGradient={feature.bgGradient}
            />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutExpertiseSection; 