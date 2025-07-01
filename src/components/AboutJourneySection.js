"use client";
import React from 'react';
import { motion } from 'framer-motion';

const milestones = [
  { year: '2021', title: 'Foundation', desc: 'Established with a vision to provide comprehensive IT and security solutions.', x: 80, y: 220, anchor: 'bottom' },
  { year: '2022', title: 'Growth', desc: 'Expanded our service offerings and built our first successful client partnerships.', x: 260, y: 120, anchor: 'top' },
  { year: '2023', title: 'Evolution', desc: 'Strengthened our expertise in cybersecurity and digital solutions.', x: 440, y: 220, anchor: 'bottom' },
  { year: '2024', title: 'Expansion', desc: 'Broadened our reach and launched new innovative solutions for global clients.', x: 660, y: 120, anchor: 'top' },
  { year: 'Now', title: 'Today & Tomorrow', desc: 'Continuing to innovate and deliver excellence, helping organizations secure their future.', x: 880, y: 220, anchor: 'bottom' },
];

const mobileMilestones = milestones.map(({x, y, anchor, ...rest}) => rest);

const AboutJourneySection = () => (
  <section className="w-full py-12 md:py-20 relative bg-white">
    {/* Brand Gradient Background from WhyChooseUs.js / SecuritySprintProcess.js */}
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 w-[200vw] h-[200vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-600/10 via-brand-400/5 to-transparent rounded-full blur-3xl opacity-50" />
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
      <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-20 flex items-center justify-center gap-3">
        <span className="bg-gradient-to-br from-brand-500 to-brand-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-4 border-white/30">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="white" />
          </svg>
        </span>
        Our Journey
      </h3>
      {/* Desktop: horizontal, milestone-connected timeline */}
      <div className="hidden md:block relative w-full" style={{height: '400px'}}>
        <svg viewBox="0 0 1000 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-0 top-0 w-full h-full z-0">
          <defs>
            <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(59 130 246)" />
              <stop offset="50%" stopColor="rgb(96 165 250)" />
              <stop offset="100%" stopColor="rgb(37 99 235)" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path d="M 80 220 Q 170 120 260 120 Q 350 120 440 220 Q 550 320 660 120 Q 770 0 880 220" stroke="url(#timelineGradient)" strokeWidth="5" fill="none" filter="url(#glow)" />
        </svg>
        {milestones.map((item, idx) => (
          <motion.div 
            key={item.year}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.1 }}
            className="absolute"
            style={{ left: `calc(${item.x / 10}% - 150px)`, top: item.anchor === 'top' ? `${item.y - 140}px` : `${item.y}px`, width: '300px', zIndex: 2 }}
          >
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 shadow-lg border-4 border-white/30 flex items-center justify-center relative animate-pulse mb-2" style={{ marginBottom: item.anchor === 'top' ? '0' : '-16px', marginTop: item.anchor === 'top' ? '-16px' : '0' }}>
                <span className="w-3 h-3 rounded-full bg-white/80 block"></span>
              </div>
              <div className={`bg-white/90 backdrop-blur-sm border border-white/20 rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12),0_15px_50px_rgba(0,0,0,0.08)] text-center min-h-[180px] flex flex-col justify-center`} style={{ marginTop: item.anchor === 'top' ? '0' : '-8px', marginBottom: item.anchor === 'top' ? '-8px' : '0' }}>
                <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-brand-600">{item.year}</div>
                <div className="text-text-primary text-base font-semibold mb-2">{item.title}</div>
                <div className="text-text-secondary text-sm leading-relaxed">{item.desc}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Mobile: stacked vertical timeline with straight line */}
      <div className="md:hidden flex flex-col items-center relative w-full" style={{minHeight: '500px'}}>
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-500 via-brand-400/60 to-transparent rounded-full shadow-[0_0_40px_10px_rgba(37,99,235,0.33)] pointer-events-none z-0" style={{transform: 'translateX(-50%)'}}></div>
        {mobileMilestones.map((item, idx, arr) => (
          <motion.div 
            key={item.year}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.1 }}
            className="flex flex-col items-center w-full mb-12 last:mb-0 relative z-10"
          >
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 shadow-lg border-4 border-white/30 flex items-center justify-center relative animate-pulse">
                <span className="w-3 h-3 rounded-full bg-white/80 block"></span>
              </div>
              {idx < arr.length - 1 && (
                <div className="w-1 h-12 bg-brand-400/40"></div>
              )}
            </div>
            <div className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-3xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)] text-center mt-4 w-11/12 max-w-xs">
              <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-brand-600">{item.year}</div>
              <div className="text-text-primary text-base font-semibold mb-1">{item.title}</div>
              <div className="text-text-secondary text-sm">{item.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutJourneySection; 