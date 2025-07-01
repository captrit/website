'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, UserCheck, UserX, Zap, DollarSign, Clock, Shield, TrendingUp, CheckCircle, XCircle, Percent, Zap as Lightning, Target } from 'lucide-react';

const ComparisonCard = ({ data, isHighlighted = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = (type) => {
    switch (type) {
      case 'in-house': return Users;
      case 'freelancer-us': return UserX;
      case 'freelancer-uae': return UserX;
      case 'our-model': return UserCheck;
      default: return Users;
    }
  };

  const Icon = getIcon(data.type);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group cursor-pointer transition-all duration-300 ${
        isHighlighted && isHovered
          ? 'scale-105 -translate-y-3'
          : !isHighlighted && isHovered
            ? 'scale-105 -translate-y-2 shadow-lg'
            : ''
      }`}
    >
      {/* Animated Background Glow */}
      <div className={`absolute inset-0 rounded-3xl blur-xl transition-all duration-500 ${
        isHighlighted 
          ? 'bg-emerald-400/20' 
          : 'bg-gray-200'
      } ${isHovered ? 'opacity-60 scale-105' : 'opacity-30 scale-100'}`} />
      <div className={`relative p-8 rounded-3xl border-2 transition-all duration-500 bg-gray-50 backdrop-blur-xl ${
        isHighlighted 
          ? 'border-emerald-500 shadow-2xl hover:shadow-[0_25px_80px_rgba(20,184,166,0.2)]' 
          : `border-gray-200 ${isHovered ? 'shadow-2xl' : 'shadow-md'}`
      }`}>
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div 
            className={`relative p-4 rounded-2xl transition-all duration-300 bg-gradient-to-br from-slate-500 via-gray-500 to-slate-600 text-white shadow-xl group-hover:scale-110 group-hover:rotate-3`}
          >
            <Icon className="w-6 h-6" />
            <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
              isHighlighted ? 'bg-emerald-400' : 'bg-slate-300'
            } animate-pulse`} />
            {/* Glow Effect */}
            <div className={`absolute inset-0 rounded-2xl blur-md opacity-50 bg-slate-400`} />
          </div>
          <div>
            <h3 className={`text-xl font-black text-slate-900`}>
              {data.title}
            </h3>
            <p className={`text-sm font-medium text-slate-600`}>
              {data.subtitle}
            </p>
          </div>
        </div>

        {/* Price Section */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2 mb-2">
            <DollarSign className={`w-5 h-5 text-slate-500`} />
            <span className={`text-3xl font-black text-slate-800 bg-gradient-to-r from-current to-current bg-clip-text`}>
              {data.cost}
            </span>
            <span className="text-sm text-slate-500 font-medium">{data.hourly}</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-slate-600 font-medium">{data.hours}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-slate-400" />
              <span className="text-slate-600 font-medium">{data.hourly}</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-3">
          {data.features.map((feature, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 p-3 rounded-xl transition-all duration-300 ${
                feature.positive 
                  ? 'bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 shadow-md hover:shadow-lg' 
                  : 'bg-gradient-to-r from-red-50 to-red-100 border border-red-200 shadow-md hover:shadow-lg'
              }`}
            >
              {feature.positive ? (
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              ) : (
                <XCircle className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-xs font-bold ${
                feature.positive ? 'text-emerald-700' : 'text-red-700'
              }`}>
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Badge */}
        <div className="mt-6 pt-4 border-t border-slate-200/60">
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
              isHighlighted 
                ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-200 shadow-lg' 
                : `bg-gray-200 text-gray-700 border border-gray-300 shadow-none ${isHovered ? 'bg-gray-300' : ''}`
            }`}
          >
            <Shield className="w-3 h-3" />
            {isHighlighted ? 'Recommended' : 'Traditional'}
          </div>
        </div>
      </div>
    </div>
  );
};

const PricingComparison = () => {
  const comparisonData = [
    {
      type: 'in-house',
      title: 'In-House Engineer',
      subtitle: 'Traditional hiring approach',
      cost: '$65–100',
      hours: '~160 hrs',
      hourly: '/hr avg',
      features: [
        { text: 'Per person', positive: false },
        { text: 'No rotation', positive: false },
        { text: 'Full-time cost', positive: false },
        { text: 'Hard to hire', positive: false }
      ]
    },
    {
      type: 'freelancer-us',
      title: 'Freelancer (US/EU)',
      subtitle: 'High-cost specialists',
      cost: '$150–300+',
      hours: '~58–100 hrs',
      hourly: '/hr',
      features: [
        { text: 'Fixed scope', positive: false },
        { text: 'No flexibility', positive: false },
        { text: 'Slow delivery', positive: false },
        { text: 'Unreliable', positive: false }
      ]
    },
    {
      type: 'freelancer-uae',
      title: 'Freelancer (UAE)',
      subtitle: 'Regional alternatives',
      cost: '$150–300+',
      hours: '~60–80 hrs',
      hourly: '/hr',
      features: [
        { text: 'High hourly rate', positive: false },
        { text: 'Inconsistent', positive: false },
        { text: 'Limited expertise', positive: false },
        { text: 'Scope-only', positive: false }
      ]
    },
    {
      type: 'our-model',
      title: 'Your Team (This)',
      subtitle: 'Revolutionary approach',
      cost: '$65',
      hours: '58–192 hrs',
      hourly: '/hr avg',
      features: [
        { text: 'Multi-expert coverage', positive: true },
        { text: 'Sprint-aligned', positive: true },
        { text: 'Predictable pricing', positive: true },
        { text: 'Faster delivery', positive: true }
      ],
      isHighlighted: true
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
        <div 
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <span
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/70 backdrop-blur-md rounded-full shadow-md border border-gray-200/80 cursor-pointer"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
              </span>
              <span className="text-sm font-semibold text-brand-800 tracking-wide">Pricing Comparison</span>
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-6">
            Why <span className="text-brand-600">Our Model</span> Wins
          </h2>
          
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            See how our revolutionary approach compares to traditional hiring methods.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-16">
          {/* First 3 cards in a row */}
          <div className="lg:col-span-2">
            <ComparisonCard
              data={comparisonData[0]}
              isHighlighted={false}
            />
          </div>
          <div className="lg:col-span-2">
            <ComparisonCard
              data={comparisonData[1]}
              isHighlighted={false}
            />
          </div>
          <div className="lg:col-span-2">
            <ComparisonCard
              data={comparisonData[2]}
              isHighlighted={false}
            />
          </div>
          
          {/* Bottom row with highlighted card and stats */}
          <div className="lg:col-span-3">
            <ComparisonCard
              data={comparisonData[3]}
              isHighlighted={true}
            />
          </div>
          
          {/* Stats Cards */}
          <div className="lg:col-span-3 space-y-5">
            <div className="text-center p-5 bg-gradient-to-br from-slate-50/95 via-white/90 to-slate-100/80 rounded-3xl border-2 border-slate-300/60 shadow-[0_8px_30px_rgba(0,0,0,0.12),0_15px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15),0_25px_80px_rgba(0,0,0,0.1)] backdrop-blur-xl flex flex-col justify-center transition-all duration-500 relative cursor-pointer"
            >
              <div className="absolute top-3 right-3">
                <div className="relative p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg">
                  <Shield className="w-4 h-4" />
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                </div>
              </div>
              <div className="text-2xl font-black text-brand-600 mb-1">100%</div>
              <div className="text-sm font-bold text-slate-800 mb-1">Security Focus</div>
              <div className="text-xs text-slate-600 font-medium">specialized expertise, no generalists</div>
            </div>
            
            <div className="text-center p-5 bg-gradient-to-br from-gray-50/95 via-white/90 to-gray-100/80 rounded-3xl border-2 border-gray-300/60 shadow-[0_8px_30px_rgba(0,0,0,0.12),0_15px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15),0_25px_80px_rgba(0,0,0,0.1)] backdrop-blur-xl flex flex-col justify-center transition-all duration-500 relative cursor-pointer"
            >
              <div className="absolute top-3 right-3">
                <div className="relative p-2 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg">
                  <Lightning className="w-4 h-4" />
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-orange-300 animate-pulse" />
                </div>
              </div>
              <div className="text-2xl font-black text-brand-600 mb-1">3x</div>
              <div className="text-sm font-bold text-gray-800 mb-1">Faster Delivery</div>
              <div className="text-xs text-slate-600 font-medium">parallel execution</div>
            </div>
            
            <div className="text-center p-5 bg-gradient-to-br from-slate-50/95 via-white/90 to-slate-100/80 rounded-3xl border-2 border-slate-300/60 shadow-[0_8px_30px_rgba(0,0,0,0.12),0_15px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15),0_25px_80px_rgba(0,0,0,0.1)] backdrop-blur-xl flex flex-col justify-center transition-all duration-500 relative cursor-pointer"
            >
              <div className="absolute top-3 right-3">
                <div className="relative p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                  <Target className="w-4 h-4" />
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-blue-300 animate-pulse" />
                </div>
              </div>
              <div className="text-2xl font-black text-brand-600 mb-1">100%</div>
              <div className="text-sm font-bold text-slate-800 mb-1">Flexibility</div>
              <div className="text-xs text-slate-600 font-medium">sprint-aligned work</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingComparison; 