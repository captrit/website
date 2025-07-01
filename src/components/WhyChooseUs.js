'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Globe, Zap, TrendingUp, Code, Shield } from 'lucide-react';

// Modern Icons with gradient backgrounds
const IconWrapper = ({ children, bgGradient = 'from-gray-200 to-gray-300' }) => (
  <div className={`p-3 rounded-xl shadow-md bg-gradient-to-br ${bgGradient} w-14 h-14 flex items-center justify-center`}>
    {children}
  </div>
);

const FeatureCard = ({ title, description, icon, stat, statLabel, badge, badgeColor = 'bg-blue-100 text-blue-800' }) => (
  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12),0_15px_50px_rgba(0,0,0,0.08)] h-full transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(0,0,0,0.15),0_25px_70px_rgba(0,0,0,0.1)] border border-white/20">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="mb-4">
          {icon}
        </div>
        <h4 className="text-xl font-bold text-text-primary mb-2">{title}</h4>
        <p className="text-text-secondary text-base leading-relaxed">{description}</p>
      </div>
      {badge && (
        <span className={`inline-flex items-center px-4 py-1.5 text-sm font-medium text-text-accent bg-background-accent border border-border-light rounded-full mb-4`}>
          {badge}
        </span>
      )}
    </div>
    {stat && (
      <div className="mt-6 pt-4 border-t border-border-default">
        <div className="text-2xl font-bold text-text-primary">{stat}</div>
        <div className="text-sm text-text-secondary">{statLabel}</div>
      </div>
    )}
  </div>
);

// Modern Illustrations (inline SVGs)
const ShieldIllustration = (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="50" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2"/>
    <path d="M60 25L80 33V48C80 63 60 75 60 75C60 75 40 63 40 48V33L60 25Z" fill="url(#shieldGradient)"/>
    <circle cx="60" cy="48" r="12" fill="white" fillOpacity="0.9"/>
    <circle cx="60" cy="48" r="6" fill="#6366F1"/>
  </svg>
)

const TeamworkIllustration = (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="28" cy="32" r="12" fill="#10B981" fillOpacity="0.2"/>
    <circle cx="52" cy="32" r="12" fill="#10B981" fillOpacity="0.2"/>
    <circle cx="40" cy="24" r="14" fill="#10B981" fillOpacity="0.3"/>
    <circle cx="28" cy="32" r="8" fill="#10B981"/>
    <circle cx="52" cy="32" r="8" fill="#10B981"/>
    <circle cx="40" cy="24" r="10" fill="#059669"/>
    <ellipse cx="40" cy="60" rx="24" ry="6" fill="#10B981" fillOpacity="0.1"/>
  </svg>
)

const GlobeIllustration = (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="24" fill="#3B82F6" fillOpacity="0.1"/>
    <circle cx="40" cy="40" r="20" fill="#3B82F6" fillOpacity="0.2"/>
    <ellipse cx="40" cy="40" rx="20" ry="8" fill="#3B82F6" fillOpacity="0.6"/>
    <ellipse cx="40" cy="40" rx="8" ry="20" fill="#2563EB" fillOpacity="0.7"/>
    <ellipse cx="40" cy="40" rx="16" ry="4" fill="#60A5FA"/>
    <circle cx="40" cy="40" r="3" fill="#1D4ED8"/>
  </svg>
)

const SpeedIllustration = (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="25" width="50" height="4" rx="2" fill="#A855F7" fillOpacity="0.3"/>
    <rect x="10" y="20" width="40" height="4" rx="2" fill="#A855F7" fillOpacity="0.5"/>
    <rect x="15" y="30" width="30" height="4" rx="2" fill="#A855F7" fillOpacity="0.7"/>
    <rect x="20" y="15" width="20" height="4" rx="2" fill="#9333EA"/>
    <rect x="25" y="35" width="10" height="4" rx="2" fill="#7C3AED"/>
  </svg>
)

const MetricsChart = (
  <svg width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#6366F1" stopOpacity="0.05" />
      </linearGradient>
    </defs>
    <path d="M10 80 L50 60 L90 45 L130 30 L170 20 L190 15" stroke="#6366F1" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M10 80 L50 60 L90 45 L130 30 L170 20 L190 15 L190 80 L10 80 Z" fill="url(#chartGradient)"/>
    <circle cx="50" cy="60" r="4" fill="#6366F1"/>
    <circle cx="90" cy="45" r="4" fill="#6366F1"/>
    <circle cx="130" cy="30" r="4" fill="#6366F1"/>
    <circle cx="170" cy="20" r="4" fill="#6366F1"/>
  </svg>
)

export default function ModernBentoGrid() {
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
        <div className="text-center max-w-4xl mx-auto mb-16">
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
              <span className="text-sm font-semibold text-brand-800 tracking-wide">Why Choose Us</span>
            </motion.span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Security that <span className="text-brand-600">scales</span> with you</h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">Enterprise protection, simplified for startups</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Feature Card */}
          <div className="lg:col-span-4">
            <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-3xl p-8 text-white h-full relative overflow-hidden group transition-all duration-300 shadow-[0_8px_30px_rgba(5,102,141,0.25),0_15px_50px_rgba(5,102,141,0.15)] hover:shadow-[0_15px_50px_rgba(5,102,141,0.35),0_25px_70px_rgba(5,102,141,0.2)] border border-white/10">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative z-10 h-full flex flex-col">
                <div className="mb-8">
                  <IconWrapper bgGradient="from-white/20 to-white/10">
                    <ShieldCheck className="w-6 h-6 text-white" strokeWidth={2} />
                  </IconWrapper>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Founder-first security</h3>
                <p className="text-white/90 text-lg mb-8 flex-grow">We align security with your business goals, not the other way around.</p>
                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-white/90">Enterprise-grade protection</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Top Right Cards */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureCard
                title="Engineer-built solutions"
                description="Custom security that fits your stack, not the other way around."
                icon={
                  <IconWrapper bgGradient="from-purple-500 to-indigo-600">
                    <Code className="w-6 h-6 text-white" strokeWidth={2} />
                  </IconWrapper>
                }
                badge="Custom workflows"
                badgeColor="bg-blue-100 text-blue-800"
              />
              
              <FeatureCard
                title="Global standards, local expertise"
                description="UAE-based team with international security expertise."
                icon={
                  <IconWrapper bgGradient="from-cyan-500 to-teal-600">
                    <Globe className="w-6 h-6 text-white" strokeWidth={2} />
                  </IconWrapper>
                }
                badge="Compliant"
                badgeColor="bg-emerald-100 text-emerald-800"
              />
            </div>
            
            {/* Bottom Right - Stats Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 relative overflow-hidden group shadow-[0_8px_30px_rgba(0,0,0,0.12),0_15px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.15),0_25px_70px_rgba(0,0,0,0.1)] transition-all duration-300 border border-white/20">
              <div className="relative">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                  <div className="flex-1 mb-6 md:mb-0">
                    <div className="flex items-center">
                      <div className="mr-6">
                        <IconWrapper bgGradient="from-amber-500 to-orange-600">
                          <Zap className="w-6 h-6 text-white" strokeWidth={2} />
                        </IconWrapper>
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold mb-1 text-text-primary">Dev-speed security</h4>
                        <p className="text-text-secondary">Security that keeps up with your development pace</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-brand-600">85%</div>
                      <div className="text-sm text-text-secondary">Faster Implementation</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-brand-600">24/7</div>
                      <div className="text-sm text-text-secondary">Security Coverage</div>
                    </div>
                  </div>
                </div>
                
                {/* Progress bar without glow */}
                <div className="mt-8 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-600 rounded-full w-0 group-hover:w-full transition-all duration-1000 ease-out"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}