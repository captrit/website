'use client';

import { useState, useEffect, useRef } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js';
import { ChevronDown } from 'lucide-react';

export default function OnDemandPricingHero() {
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
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
      window.removeEventListener('resize', resizeCanvas);
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
      if (longPressTimer.current) clearTimeout(longPressTimer.current);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [colors, isMobile]);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-background-primary">
      <canvas ref={canvasRef} className="absolute inset-0" style={{ zIndex: 1 }} />

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 w-[200vw] h-[200vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500/10 via-cyan-400/5 to-transparent rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-background-accent border border-border-light mb-6 sm:mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="w-2 h-2 bg-brand-600 rounded-full mr-2 animate-pulse"></div>
          <span className="text-text-accent text-xs sm:text-sm font-medium">Transparent Pricing. No Surprises.</span>
        </div>

        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] sm:leading-[1.05] mb-6 sm:mb-8 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="block text-text-primary">Project-Based</span>
          <span className="block bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">Security Services</span>
          <span className="block text-text-primary">On Your Terms</span>
        </h1>

        <p className={`text-lg sm:text-xl text-text-secondary mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          For precise needs & clear budgets. Get expert security assessments without the commitment of a subscription. All services are individual, one-time projects.
        </p>
        
        <div className={`transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a 
            href="/contact"
            className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-button-text transition-all duration-300 bg-brand-600 hover:bg-brand-700 rounded-xl sm:rounded-2xl hover:scale-105 hover:shadow-2xl hover:shadow-brand-500/25 active:scale-95"
          >
            <span className="relative flex items-center">
              Get a Precise Quote
            </span>
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-1000 delay-[1200ms] ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <ChevronDown className="w-8 h-8 text-gray-500 animate-bounce-slow" />
      </div>
    </section>
  );
} 