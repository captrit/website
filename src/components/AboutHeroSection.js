'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js';
import { User, Hexagon, Zap, Search } from 'lucide-react';

const AboutHeroSection = () => {
  const canvasRef = useRef(null);
  const gridRef = useRef({});
  const [isMobile, setIsMobile] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isLongPressing, setIsLongPressing] = useState(false);
  const longPressTimer = useRef(null);
  const fullConfig = resolveConfig(tailwindConfig);
  const colors = fullConfig.theme.colors;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    const GRID_SIZE = isMobile ? 30 : 40;
    const FADE_SPEED = 0.015;
    const MAX_OPACITY = 0.7;
    const BRAND_COLOR = colors.brand[600];
    const hexToRgba = (hex, alpha = 1) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    const getGridKey = (x, y) => {
      const gridX = Math.floor(x / GRID_SIZE);
      const gridY = Math.floor(y / GRID_SIZE);
      return `${gridX}-${gridY}`;
    };
    const handleInteraction = (e) => {
      if (e.type === 'mousemove' && !isMouseDown) return;
      const rect = canvas.getBoundingClientRect();
      let interactionX, interactionY;
      if (e.type === 'touchmove') {
        if (!isLongPressing) return;
        if (e.cancelable) e.preventDefault();
        interactionX = e.touches[0].clientX - rect.left;
        interactionY = e.touches[0].clientY - rect.top;
      } else if (e.type === 'touchstart') {
        longPressTimer.current = setTimeout(() => {
          setIsLongPressing(true);
          if (e.cancelable) e.preventDefault();
        }, 300);
        return;
      } else if (e.buttons === 1 || e.type === 'mousedown') {
        interactionX = e.clientX - rect.left;
        interactionY = e.clientY - rect.top;
      } else {
        return;
      }
      const gridX = Math.floor(interactionX / GRID_SIZE);
      const gridY = Math.floor(interactionY / GRID_SIZE);
      const key = `${gridX}-${gridY}`;
      if (gridX * GRID_SIZE < canvas.width && gridY * GRID_SIZE < canvas.height && gridX >= 0 && gridY >= 0) {
        gridRef.current[key] = {
          opacity: MAX_OPACITY,
          x: gridX * GRID_SIZE,
          y: gridY * GRID_SIZE
        };
      }
    };
    const handleMouseDown = (e) => {
      if (e.button === 0) {
        setIsMouseDown(true);
        handleInteraction(e);
      }
    };
    const handleTouchEnd = () => {
      setIsMouseDown(false);
      setIsLongPressing(false);
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
    };
    const handleTouchCancel = () => {
      setIsMouseDown(false);
      setIsLongPressing(false);
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
    };
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('mouseup', () => {
      setIsMouseDown(false);
      setIsLongPressing(false);
    });
    canvas.addEventListener('touchstart', handleInteraction, { passive: false });
    canvas.addEventListener('touchmove', handleInteraction, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: true });
    canvas.addEventListener('touchcancel', handleTouchCancel, { passive: true });
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = hexToRgba(BRAND_COLOR, 0.12);
      ctx.lineWidth = 1;
      for (let x = 0; x <= canvas.width; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      Object.keys(gridRef.current).forEach(key => {
        const tile = gridRef.current[key];
        if (tile.opacity > 0) {
          ctx.fillStyle = hexToRgba(BRAND_COLOR, tile.opacity);
          ctx.fillRect(tile.x, tile.y, GRID_SIZE, GRID_SIZE);
          ctx.shadowColor = hexToRgba(BRAND_COLOR, 0.3);
          ctx.shadowBlur = 5;
          ctx.fillRect(tile.x, tile.y, GRID_SIZE, GRID_SIZE);
          ctx.shadowBlur = 0;
          ctx.strokeStyle = hexToRgba(BRAND_COLOR, tile.opacity * 1.5);
          ctx.lineWidth = 1;
          ctx.strokeRect(tile.x, tile.y, GRID_SIZE, GRID_SIZE);
          tile.opacity -= FADE_SPEED;
        } else {
          delete gridRef.current[key];
        }
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('mouseup', () => {
        setIsMouseDown(false);
        setIsLongPressing(false);
      });
      canvas.removeEventListener('touchstart', handleInteraction);
      canvas.removeEventListener('touchmove', handleInteraction);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('touchcancel', handleTouchCancel);
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [colors, isMobile]);

  // IconWrapper and FeatureCard from WhyChooseUs.js
  const IconWrapper = ({ children, bgGradient = 'from-brand-500 to-brand-600' }) => (
    <div className={`p-1 md:p-2 rounded-2xl bg-gradient-to-br ${bgGradient} w-7 h-7 md:w-10 md:h-10 flex items-center justify-center`}>
      {React.cloneElement(children, { className: 'w-4 h-4 md:w-5 md:h-5 text-white' })}
    </div>
  );

  const FeatureCard = ({ title, description, icon, bgGradient }) => (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-2 shadow-[0_4px_16px_rgba(0,0,0,0.10)] h-full min-h-[64px] w-full transition-all duration-300 group hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-white/20">
      <div className="flex items-start gap-1 md:gap-4">
        <IconWrapper bgGradient={bgGradient}>{icon}</IconWrapper>
        <div>
          <h4 className="text-xs md:text-lg font-bold text-text-primary mb-0.5 leading-tight">{title}</h4>
          <p className="text-[10px] md:text-sm text-text-secondary leading-tight">{description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-background-primary">
      {/* Canvas for grid effect */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-auto" />
      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-20 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Right Column - Image Container */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative hidden lg:block mt-12 lg:mt-0"
          >
            <div className="relative w-full aspect-square flex items-center justify-center">
              {/* Strong Brand Gradient Border */}
              <div className="absolute inset-0 rounded-2xl p-1 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 shadow-[0_0_32px_0_rgba(37,99,235,0.25)]" />
              {/* Main Image Container */}
              <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden bg-white">
                <div className="absolute inset-0 p-6">
                  <div className="h-full w-full rounded-xl overflow-hidden relative group">
                    <Image
                      src="/images/cybersecurity-in-dubai.jpg"
                      alt="Leading Cybersecurity Services in Dubai UAE - VAPT, Network Security, and Digital Protection Solutions"
                      layout="fill"
                      objectFit="cover"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                    {/* Modern Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    {/* Modern Corner Elements */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-brand-200/40 rounded-tl-xl"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-brand-200/40 rounded-br-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative"
          >
            {/* Main Content */}
            <div className="relative">
              <div className="text-center sm:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100/40 border border-brand-200 mb-6 text-lg"
                >
                  <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse"></span>
                  <span className="text-brand-600 text-sm font-medium">About Us</span>
                </motion.div>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-text-primary mb-6 leading-[1.1] sm:leading-[1.05] text-center sm:text-left"
              >
                Securing Your
                <span className="relative block mt-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">Digital Future</span>
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-xl text-text-secondary mb-8 max-w-2xl text-center sm:text-left"
              >
                UAE's offensive security partner for SaaS, startups, and dev-first teams.
              </motion.p>
              {/* Modernized Feature Cards */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                <FeatureCard
                  title="Offensive Security"
                  description="Red team & VAPT"
                  icon={<User className="w-6 h-6 text-white" strokeWidth={2} />}
                  bgGradient="from-brand-500 to-brand-600"
                />
                <FeatureCard
                  title="Dev-First Approach"
                  description="For developers"
                  icon={<Zap className="w-6 h-6 text-white" strokeWidth={2} />}
                  bgGradient="from-emerald-400 to-emerald-600"
                />
                <FeatureCard
                  title="UAE & Global"
                  description="Compliant"
                  icon={<Hexagon className="w-6 h-6 text-white" strokeWidth={2} />}
                  bgGradient="from-indigo-400 to-indigo-600"
                />
                <FeatureCard
                  title="Partnership"
                  description="Ongoing support"
                  icon={<Search className="w-6 h-6 text-white" strokeWidth={2} />}
                  bgGradient="from-cyan-400 to-cyan-600"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-row gap-2 w-full md:justify-start md:w-auto"
              >
                <a href="/attack-surface-discovery" className="flex-1 md:flex-none md:w-[220px] px-3 py-2 sm:px-6 sm:py-2 bg-gradient-to-r from-brand-500 to-brand-600 rounded-full text-white text-xs sm:text-base font-medium text-center whitespace-nowrap hover:shadow-lg hover:shadow-brand-400/20 transition-all duration-300">
                  Get Free Security Assessment
                </a>
                <a href="/contact" className="flex-1 md:flex-none md:w-auto md:min-w-[120px] md:max-w-[140px] px-3 py-2 sm:px-6 sm:py-2 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full text-white text-xs sm:text-base font-medium text-center hover:shadow-lg hover:shadow-brand-400/20 transition-all duration-300">
                  Contact Us
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection; 