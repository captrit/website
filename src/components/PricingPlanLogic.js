'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Users, Zap, Clock, ArrowRight, Sparkles, Layers, Cpu, Shield } from 'lucide-react';

// Animated 3D Card Component
const AnimatedCard = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, rotateX: -15 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    whileHover={{ 
      y: -10, 
      rotateX: 5,
      transition: { duration: 0.3 }
    }}
    className={`transform-gpu perspective-1000 h-full ${className}`}
  >
    {children}
  </motion.div>
);

// Floating Icon with Particle Effects
const FloatingIcon = ({ icon: Icon, color = "from-brand-500 to-brand-600", size = "w-16 h-16" }) => (
  <div className="relative group">
    <div className={`${size} rounded-2xl bg-gradient-to-br ${color} p-4 shadow-xl transform-gpu transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 border border-white/20`}>
      <Icon className="w-full h-full text-white" strokeWidth={1.5} />
    </div>
  </div>
);

// Custom SVG Illustrations
const BrainCircuit = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <circle cx="60" cy="60" r="45" fill="url(#brainGradient)" opacity="0.1"/>
    <path d="M40 40 Q60 20 80 40 Q90 60 80 80 Q60 100 40 80 Q30 60 40 40" 
          stroke="url(#brainGradient)" strokeWidth="2" fill="none" filter="url(#glow)"/>
    <circle cx="50" cy="50" r="3" fill="#8B5CF6" className="animate-pulse"/>
    <circle cx="70" cy="50" r="3" fill="#EC4899" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
    <circle cx="60" cy="70" r="3" fill="#8B5CF6" className="animate-pulse" style={{animationDelay: '1s'}}/>
    <path d="M50 50 L70 50 M60 50 L60 70" stroke="url(#brainGradient)" strokeWidth="1" opacity="0.6"/>
  </svg>
);

const TeamNetwork = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="teamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06B6D4" />
        <stop offset="100%" stopColor="#0891B2" />
      </linearGradient>
    </defs>
    {/* Connection lines */}
    <path d="M30 40 L50 30 L70 40 M30 60 L50 70 L70 60 M30 40 L30 60 M70 40 L70 60" 
          stroke="url(#teamGradient)" strokeWidth="1.5" opacity="0.4"/>
    {/* Nodes */}
    <circle cx="30" cy="40" r="8" fill="url(#teamGradient)" className="animate-pulse"/>
    <circle cx="70" cy="40" r="8" fill="url(#teamGradient)" className="animate-pulse" style={{animationDelay: '0.3s'}}/>
    <circle cx="30" cy="60" r="8" fill="url(#teamGradient)" className="animate-pulse" style={{animationDelay: '0.6s'}}/>
    <circle cx="70" cy="60" r="8" fill="url(#teamGradient)" className="animate-pulse" style={{animationDelay: '0.9s'}}/>
    <circle cx="50" cy="30" r="10" fill="#0891B2" className="animate-pulse" style={{animationDelay: '0.2s'}}/>
    <circle cx="50" cy="70" r="10" fill="#06B6D4" className="animate-pulse" style={{animationDelay: '0.7s'}}/>
  </svg>
);

// Interactive Feature List
const InteractiveFeature = ({ text, icon: Icon, color = "from-brand-500 to-brand-600" }) => (
  <motion.div
    whileHover={{ scale: 1.02, x: 5 }}
    className="flex items-center gap-3 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md"
  >
    <div className={`p-2 rounded-lg bg-gradient-to-br ${color} shadow-lg border border-white/20`}>
      <Icon className="w-4 h-4 text-white" strokeWidth={2} />
    </div>
    <span className="text-sm font-medium text-text-primary group-hover:text-text-primary transition-colors">
      {text}
    </span>
    <ArrowRight className="w-4 h-4 text-text-secondary ml-auto group-hover:text-text-primary transition-colors" />
  </motion.div>
);

export default function PricingPlanLogic() {
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
        
        {/* Header Section */}
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
              <span className="text-sm font-semibold text-brand-800 tracking-wide">Smart Pricing Logic</span>
            </motion.span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            <span className="text-brand-600">Revolutionary</span> Pricing
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Where flexibility meets expertise. No rigid plans, just intelligent resource allocation.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Simple Plan Logic Section */}
          <AnimatedCard delay={0.2}>
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12),0_15px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.15),0_25px_70px_rgba(0,0,0,0.1)] transition-all duration-300 border border-white/20 relative overflow-hidden h-full flex flex-col group">
              {/* Creative diagonal accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-500/10 to-transparent rounded-bl-full" />
              
              <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative">
                    <FloatingIcon icon={Brain} color="from-brand-500 to-brand-600" />
                  </div>
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 rounded-full border border-brand-200/50 mb-2">
                      <span className="text-xs font-semibold text-brand-700">CORE FEATURE</span>
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary mb-2">Simple Plan Logic</h3>
                    <p className="text-brand-600 font-semibold">Flexible, Usage-Based Plans</p>
                  </div>
                </div>
                
                <p className="text-lg text-text-secondary mb-6 leading-relaxed flex-1">
                  We don't charge per task. You get a pool of expert engineering hours each month — 
                  used however you want.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <InteractiveFeature text="Security testing" icon={Shield} color="from-emerald-500 to-teal-500" />
                  <InteractiveFeature text="Threat modeling" icon={Brain} color="from-brand-500 to-brand-600" />
                  <InteractiveFeature text="Cloud audits" icon={Layers} color="from-cyan-500 to-brand-500" />
                  <InteractiveFeature text="Code reviews" icon={Cpu} color="from-orange-500 to-amber-500" />
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-100 to-cyan-100 rounded-2xl opacity-50" />
                  <div className="relative text-center p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-brand-200/50">
                    <span className="text-sm font-medium text-brand-700">
                      If the task fits in your hours, we do it.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* Built-in Flexibility Section */}
          <AnimatedCard delay={0.4}>
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12),0_15px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.15),0_25px_70px_rgba(0,0,0,0.1)] transition-all duration-300 border border-white/20 relative overflow-hidden h-full flex flex-col group">
              {/* Creative diagonal accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full" />
              
              <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative">
                    <FloatingIcon icon={Users} color="from-cyan-500 to-brand-500" />
                  </div>
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-50 rounded-full border border-cyan-200/50 mb-2">
                      <span className="text-xs font-semibold text-cyan-700">CORE FEATURE</span>
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary mb-2">Built-In Flexibility</h3>
                    <p className="text-cyan-600 font-semibold">Multiple Experts, One Subscription</p>
                  </div>
                </div>
                
                <p className="text-lg text-text-secondary mb-6 leading-relaxed flex-1">
                  Your product needs more than one kind of security skill. So we rotate in exactly 
                  the right engineer for each job — no retraining, no new hiring, no delays.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <InteractiveFeature text="CloudSec Expert" icon={Layers} color="from-cyan-500 to-brand-500" />
                  <InteractiveFeature text="VAPT Lead" icon={Shield} color="from-emerald-500 to-teal-500" />
                  <InteractiveFeature text="DevSecOps" icon={Cpu} color="from-orange-500 to-amber-500" />
                  <InteractiveFeature text="Security Team" icon={Users} color="from-brand-500 to-brand-600" />
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-100 to-brand-100 rounded-2xl opacity-50" />
                  <div className="relative text-center p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-cyan-200/50">
                    <span className="text-sm font-medium text-cyan-700">
                      You get specialist-level delivery, without bloating your team.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
} 