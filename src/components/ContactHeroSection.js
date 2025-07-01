'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js';
import { MessageCircle, Phone, Mail, MapPin, Clock, Shield, Zap, Users } from 'lucide-react';

export default function ContactHeroSection() {
  const canvasRef = useRef(null);
  const gridRef = useRef({});
  const [isMobile, setIsMobile] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isLongPressing, setIsLongPressing] = useState(false);
  const longPressTimer = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const fullConfig = resolveConfig(tailwindConfig);
  const colors = fullConfig.theme.colors;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsLoaded(true);
    
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

  const handleCardClick = () => {
    const formSection = document.getElementById('contact-form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const ContactCard = ({ icon: Icon, title, description, gradient, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay }}
      className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-2 border border-white/20 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-bold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
    </motion.div>
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background-primary pt-20">
      {/* Canvas for grid effect */}
      <canvas ref={canvasRef} className="absolute inset-0" style={{ zIndex: 1 }} />

      {/* Brand Gradient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-1/2 w-[200vw] h-[200vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-600/10 via-brand-400/5 to-transparent rounded-full blur-3xl opacity-50" />
        <div className="absolute -left-20 top-40 w-60 h-60 bg-white/10 rounded-full blur-2xl opacity-60 animate-float pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100/40 border border-brand-200 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse"></span>
            <span className="text-brand-600 text-sm font-medium">Get In Touch</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight"
          >
            Let's <span className="text-brand-600">Secure</span> Your Future
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Ready to transform your security posture? Our team of experts is here to help you build a robust cybersecurity foundation.
          </motion.p>
        </div>

        {/* Contact Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 justify-center"
        >
          <ContactCard
            icon={Phone}
            title="Phone Support"
            description="Call us directly for urgent security matters"
            gradient="from-emerald-500 to-emerald-600"
            delay={0.7}
          />
          <ContactCard
            icon={Mail}
            title="Email Us"
            description="Send us detailed project requirements"
            gradient="from-indigo-500 to-indigo-600"
            delay={0.8}
          />
          <ContactCard
            icon={MapPin}
            title="Visit Us"
            description="Meet our team in Dubai, UAE"
            gradient="from-purple-500 to-purple-600"
            delay={0.9}
          />
        </motion.div>

        {/* Scroll Down Icon */}
        <div className="flex justify-center mt-8">
          <span className="animate-bounce text-brand-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
} 