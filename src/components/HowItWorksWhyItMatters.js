'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function HowItWorksWhyItMatters() {
  const [windowSize, setWindowSize] = useState({ width: 1024, height: 768 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    if (typeof window !== 'undefined') {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const features = [
    {
      icon: '⚡',
      title: '10x Cost Savings',
      description: 'Fixing bugs in production is 10x more expensive than catching them early',
      highlight: 'We stop issues before they ship'
    },
    {
      icon: '🚀',
      title: 'Zero Friction',
      description: 'Developers maintain velocity with continuous security',
      highlight: 'No more disruptive pentest cycles'
    },
    {
      icon: '🛡️',
      title: 'Built to Last',
      description: 'Security that evolves with your product',
      highlight: 'Ongoing protection, not one-time checks'
    }
  ];

  // Calculate radius based on screen size for perfect triangular formation
  const getRadius = () => {
    if (windowSize.width < 640) return 140; // Mobile
    if (windowSize.width < 768) return 180; // Small tablet
    if (windowSize.width < 1024) return 220; // Tablet
    if (windowSize.width < 1280) return 260; // Desktop
    return 300; // Large desktop
  };

  // Perfect equilateral triangle positions (120 degrees apart)
  const getPosition = (index) => {
    const radius = getRadius();
    // Start from top and go clockwise: 0°, 120°, 240°
    const angle = (index * 120 - 90) * (Math.PI / 180); // -90 to start from top
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  };

  return (
    <section className="relative bg-white py-20 md:py-24 lg:py-32 overflow-hidden">
      {/* Brand Gradient Orbs and Particles (EXACT MATCH) */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-100/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-100/20 rounded-full blur-3xl animate-pulse delay-1000" />
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => {
          // Use deterministic positioning based on index to avoid hydration mismatch
          const left = (i * 6.8 + 8) % 100; // Deterministic left position
          const top = (i * 9.2 + 12) % 100; // Deterministic top position
          const xOffset = (i * 15) % 100 - 50; // Deterministic x animation
          const yOffset = (i * 19) % 100 - 50; // Deterministic y animation
          const duration = 7 + (i % 4) * 1.5; // Deterministic duration
          const delay = (i % 5) * 0.3; // Deterministic delay
          
          return (
            <motion.div
              key={i}
              animate={{
                x: [0, xOffset],
                y: [0, yOffset],
                opacity: [0.1, 0.3, 0.1],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay
              }}
              className="absolute w-2 h-2 bg-slate-300/40 rounded-full opacity-20"
              style={{
                left: `${left}%`,
                top: `${top}%`
              }}
            />
          );
        })}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
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
              <span className="text-sm font-semibold text-brand-800 tracking-wide">Why It Matters</span>
            </motion.span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-4">
            Security that <span className="text-brand-600">adapts</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            to your development workflow, not the other way around
          </p>
        </motion.div>

        {/* Features Section Responsive */}
        {windowSize.width < 640 ? (
          <div className="flex flex-col items-center gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 * index }}
                className="w-full max-w-xs mx-auto"
              >
                <div className="relative bg-white/90 backdrop-blur-xl border border-white/80 rounded-2xl p-6 shadow-[0_8px_40px_rgba(0,0,0,0.18)] transition-all duration-500 hover:border-white">
                  <div className="relative w-16 h-16 mx-auto mb-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl shadow-lg" />
                    <div className="absolute inset-1 bg-white/95 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                  </div>
                  <div className="text-center space-y-4">
                    <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{feature.description}</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50/80 border border-brand-200/50 rounded-full text-xs font-semibold text-brand-700 backdrop-blur-sm">
                      <div className="w-2 h-2 bg-brand-500 rounded-full shadow-sm" />
                      {feature.highlight}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="relative flex items-center justify-center" style={{ 
            height: 'clamp(700px, 80vh, 900px)',
            minHeight: '700px'
          }}>
            {/* Modern Central Hub */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.8, type: "spring", stiffness: 100 }}
              className="absolute z-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
              >
                {/* Outer Ring */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 border-2 border-slate-200/60 rounded-full backdrop-blur-sm"
                />
                
                {/* Inner Ring */}
                <div className="absolute inset-2 border border-slate-300/40 rounded-full" />
                
                {/* Core with Soft Brand Accent */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.08, 1],
                    boxShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.3)",
                      "0 0 40px rgba(59, 130, 246, 0.4)",
                      "0 0 20px rgba(59, 130, 246, 0.3)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-4 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center shadow-2xl"
                >
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-3 h-3 bg-white rounded-full shadow-lg"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Features in Perfect Equilateral Triangle */}
            {features.map((feature, index) => {
              const position = getPosition(index);
              
              return (
                <motion.div
                  key={index}
                  initial={{ 
                    opacity: 0, 
                    scale: 0.5,
                    x: 0,
                    y: 0
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: position.x,
                    y: position.y
                  }}
                  transition={{ 
                    duration: 1, 
                    delay: 1.2 + index * 0.2,
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: position.y - 8,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                  className="absolute group cursor-pointer"
                  style={{ 
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    transformOrigin: 'center center'
                  }}
                >
                  <motion.div
                    animate={{ 
                      y: [0, -6, 0],
                    }}
                    transition={{ 
                      duration: 4 + index * 0.5, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 1.2
                    }}
                    className="relative -translate-x-1/2 -translate-y-1/2"
                  >
                    {/* Subtle Glow Effect */}
                    <div className="absolute -inset-6 bg-slate-100/20 rounded-3xl blur-2xl group-hover:bg-brand-100/30 transition-all duration-500" />
                    
                    {/* Modern Glass Card */}
                    <div className="relative bg-white/90 backdrop-blur-xl border border-white/80 rounded-2xl p-6 w-72 md:w-80 lg:w-84 shadow-[0_8px_40px_rgba(0,0,0,0.18)] group-hover:shadow-[0_0_0_6px_rgba(59,130,246,0.18),0_8px_40px_rgba(0,0,0,0.18)] group-hover:shadow-2xl transition-all duration-500 hover:border-white">
                      
                      {/* Modern Icon Container */}
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="relative w-16 h-16 mx-auto mb-5"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl shadow-lg" />
                        <motion.div 
                          animate={{ 
                            boxShadow: [
                              "inset 0 0 0 1px rgba(255,255,255,0.2)",
                              "inset 0 0 0 1px rgba(255,255,255,0.4)",
                              "inset 0 0 0 1px rgba(255,255,255,0.2)"
                            ]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="absolute inset-1 bg-white/95 rounded-xl flex items-center justify-center backdrop-blur-sm"
                        >
                          <span className="text-2xl">{feature.icon}</span>
                        </motion.div>
                      </motion.div>

                      <div className="text-center space-y-4">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-slate-800 transition-colors">
                          {feature.title}
                        </h3>
                        
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                          {feature.description}
                        </p>
                        
                        {/* Modern Status Badge with Soft Brand Accent */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50/80 border border-brand-200/50 rounded-full text-xs font-semibold text-brand-700 backdrop-blur-sm"
                        >
                          <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 bg-brand-500 rounded-full shadow-sm"
                          />
                          {feature.highlight}
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Modern Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center gap-3">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  delay: i * 0.3
                }}
                className="w-3 h-3 bg-brand-500 rounded-full shadow-lg"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}