'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Custom',
    price: 'Let\'s Talk',
    hours: 'Flexible',
    hourly: 'Flexible',
    label: 'Full DevSecOps Stack',
    cta: 'Contact Us',
    highlight: false
  },
  {
    name: 'Core',
    price: '$3,900',
    hours: '58 hrs/month',
    hourly: '~$67/hr',
    label: 'MVP-Ready Security',
    cta: 'Get Started',
    highlight: false
  },
  {
    name: 'Growth',
    price: '$7,600',
    hours: '116 hrs/month',
    hourly: '~$65/hr',
    label: 'Most Popular',
    cta: 'Get Started',
    highlight: true
  },
  {
    name: 'Scale',
    price: '$12,500',
    hours: '192 hrs/month',
    hourly: '~$65/hr',
    label: 'Enterprise Ready',
    cta: 'Get Started',
    highlight: false
  }
];

const PlanCard = ({ plan }) => (
  <div className={`group relative rounded-3xl bg-gradient-to-br from-white/95 via-white/90 to-white/95 backdrop-blur-xl border border-white/40 shadow-2xl p-6 flex flex-col items-center transition-all duration-700 ${plan.highlight ? 'ring-2 ring-brand-500/60 bg-gradient-to-br from-white/98 via-brand-50/40 to-white/98 shadow-brand-500/30' : ''}`}> 
    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-brand-500/30 via-brand-400/20 to-brand-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${plan.highlight ? 'opacity-40' : ''} pointer-events-none`}></div>
    <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
      <div className="absolute top-4 right-4 w-2 h-2 bg-brand-400/60 rounded-full animate-pulse"></div>
      <div className="absolute bottom-6 left-6 w-1 h-1 bg-brand-300/40 rounded-full animate-pulse delay-300"></div>
      <div className="absolute top-1/2 right-2 w-1.5 h-1.5 bg-brand-500/50 rounded-full animate-pulse delay-500"></div>
    </div>
    <div className="relative text-center w-full">
      <h3 className="text-2xl font-bold mb-3 text-text-primary group-hover:text-brand-600 transition-colors duration-300">{plan.name}</h3>
      <div className="text-brand-600 font-semibold mb-4 text-sm bg-gradient-to-r from-brand-50 to-transparent px-3 py-1 rounded-full">{plan.label}</div>
      <div className="relative mb-3">
        <div className="text-4xl font-black text-text-primary group-hover:scale-110 transition-transform duration-300">{plan.price}</div>
        {plan.price !== "Let's Talk" && <div className="absolute -top-2 -right-3 w-4 h-4 bg-gradient-to-r from-brand-500 to-brand-600 rounded-full animate-pulse shadow-lg"></div>}
      </div>
      <div className="text-slate-600 mb-2 text-sm font-medium bg-slate-50 px-3 py-1 rounded-full">{plan.hours}</div>
      <div className="text-slate-400 mb-6 text-xs">{plan.hourly}</div>
      <div className="mb-6 space-y-2">
        {plan.name === 'Core' && (<> <div className="text-xs text-slate-600 flex items-center"><span className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-2"></span>MVP-Ready Security</div> <div className="text-xs text-slate-600 flex items-center"><span className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-2"></span>Perfect for startups</div> <div className="text-xs text-slate-600 flex items-center"><span className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-2"></span>Essential compliance</div> <div className="text-xs text-slate-600 flex items-center"><span className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-2"></span>Basic security testing</div> </>)}
        {plan.name === 'Growth' && (<> <div className="text-xs text-slate-600 flex items-center"><span className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-2"></span>Full security coverage</div> <div className="text-xs text-slate-600 flex items-center"><span className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-2"></span>DevSecOps integration</div> <div className="text-xs text-slate-600 flex items-center"><span className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-2"></span>SOC2 preparation</div> <div className="text-xs text-slate-600 flex items-center"><span className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-2"></span>Threat modeling</div> </>)}
        {plan.name === 'Scale' && (<> <div className="text-xs text-slate-600 flex items-center"><span className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-2"></span>Enterprise Ready</div> <div className="text-xs text-slate-600 flex items-center"><span className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-2"></span>24/7 security monitoring</div> <div className="text-xs text-slate-600 flex items-center"><span className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-2"></span>Advanced threat hunting</div> <div className="text-xs text-slate-600 flex items-center"><span className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-2"></span>Custom security tools</div> </>)}
        {plan.name === 'Custom' && (<> <div className="text-xs text-slate-600 flex items-center"><span className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-2"></span>Full DevSecOps stack</div> <div className="text-xs text-slate-600 flex items-center"><span className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-2"></span>Custom integrations</div> <div className="text-xs text-slate-600 flex items-center"><span className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-2"></span>Dedicated security team</div> <div className="text-xs text-slate-600 flex items-center"><span className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-2"></span>Enterprise features</div> </>)}
      </div>
      <Link href="/contact" className={`w-full group relative inline-flex items-center justify-center px-6 py-4 text-base font-bold text-white transition-all duration-500 rounded-2xl overflow-hidden ${plan.highlight ? 'bg-gradient-to-r from-brand-600 via-brand-500 to-brand-600 hover:from-brand-700 hover:via-brand-600 hover:to-brand-700 shadow-lg shadow-brand-500/25' : 'bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 hover:from-slate-800 hover:via-slate-700 hover:to-slate-800 shadow-lg'} hover:scale-105 hover:shadow-xl hover:shadow-brand-500/30 active:scale-95`}>
        <span className="relative flex items-center"> {plan.name === 'Custom' ? 'Contact Us' : 'Get Started'} <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /> </svg> </span>
      </Link>
    </div>
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
  </div>
);

export default function PricingHeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef(null);
  const gridRef = useRef({});
  const [isMobile, setIsMobile] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isLongPressing, setIsLongPressing] = useState(false);
  const longPressTimer = useRef(null);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' }, [Autoplay({ delay: 20000, stopOnInteraction: true })]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const fullConfig = resolveConfig(tailwindConfig);
  const colors = fullConfig.theme.colors;

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsLoaded(true);
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

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-background-primary pt-20 pb-12">
      {/* Canvas for grid effect */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />

      {/* 🌐 Subtle Cyan Gradient Globe Line */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 w-[200vw] h-[200vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500/10 via-cyan-400/5 to-transparent rounded-full blur-3xl opacity-50" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center mb-8">
        {/* Add gap between Navbar and badge */}
        <div className="mt-8"></div>
        <div className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-background-accent border border-border-light mb-6 sm:mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="w-2 h-2 bg-brand-600 rounded-full mr-2 animate-pulse"></div>
          <span className="text-text-accent text-xs sm:text-sm font-medium">Your Security Team. On Demand.</span>
        </div>

        <h1 className={`text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] sm:leading-[1.05] mb-6 sm:mb-8 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="block text-text-primary">Stop Paying $150K+</span>
          <span className="block bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">For One Security Hire</span>
        </h1>

        <p className={`text-base sm:text-lg md:text-xl lg:text-2xl text-text-secondary mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-text-accent font-semibold text-sm sm:text-base md:text-lg lg:text-xl">Get a complete security team for half the cost.</span><br />
          <span className="text-text-secondary text-sm sm:text-base md:text-lg lg:text-xl">No hiring delays. No HR overhead. Just results.</span>
        </p>
      </div>

      {/* Pricing Cards Section */}
      <div className="relative z-10 w-full">
        {isMobile ? (
          <div className="w-full px-4">
            <div className="overflow-hidden -mx-4" ref={emblaRef}>
              <div className="flex">
                {plans.map((plan, idx) => (
                  <div className="flex-[0_0_90%] min-w-0 px-2 py-4" key={idx}>
                    <PlanCard plan={plan} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center mt-6 gap-2">
              <button onClick={scrollPrev} className="p-2 rounded-full bg-white/60 backdrop-blur-sm text-slate-700 hover:bg-white transition-colors"><ArrowLeft size={20} /></button>
              <div className="flex items-center justify-center gap-2">
                {scrollSnaps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === selectedIndex ? 'w-4 bg-brand-500' : 'bg-slate-300'
                    }`}
                  />
                ))}
              </div>
              <button onClick={scrollNext} className="p-2 rounded-full bg-white/60 backdrop-blur-sm text-slate-700 hover:bg-white transition-colors"><ArrowRight size={20} /></button>
            </div>
          </div>
        ) : (
          <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {plans.map((plan, idx) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                >
                  <PlanCard plan={plan} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 