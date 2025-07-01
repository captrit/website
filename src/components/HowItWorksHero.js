'use client';

import { useState, useEffect, useRef } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js';
import Image from 'next/image';

export default function HowItWorksHero({ handleScrollToForm }) {
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
    const GRID_SIZE = isMobile ? 30 : 40;
    const FADE_SPEED = 0.015;
    const MAX_OPACITY = 0.7;
    const LONG_PRESS_DURATION = 500;

    let animationId;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    resizeCanvas();

    const getTileCoordinates = (event) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const tileX = Math.floor(x / GRID_SIZE) * GRID_SIZE;
      const tileY = Math.floor(y / GRID_SIZE) * GRID_SIZE;
      return { tileX, tileY };
    };

    const handleInteraction = (event) => {
      if (isMouseDown || isLongPressing || (event.touches && event.touches.length > 0)) {
        const { tileX, tileY } = getTileCoordinates(event);
        const key = `${tileX},${tileY}`;
        gridRef.current[key] = { x: tileX, y: tileY, opacity: MAX_OPACITY };
      }
    };

    const handleMouseDown = (event) => {
      setIsMouseDown(true);
      handleInteraction(event);
      longPressTimer.current = setTimeout(() => setIsLongPressing(true), LONG_PRESS_DURATION);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
      setIsLongPressing(false);
      if (longPressTimer.current) clearTimeout(longPressTimer.current);
    };

    const handleTouchEnd = () => {
      if (longPressTimer.current) clearTimeout(longPressTimer.current);
      setIsLongPressing(false);
    };

    const handleTouchCancel = () => {
      if (longPressTimer.current) clearTimeout(longPressTimer.current);
      setIsLongPressing(false);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('touchstart', handleInteraction, { passive: true });
    canvas.addEventListener('touchmove', handleInteraction, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd);
    canvas.addEventListener('touchcancel', handleTouchCancel);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = `rgba(${parseInt(colors.brand[600].slice(1, 3), 16)}, ${parseInt(colors.brand[600].slice(3, 5), 16)}, ${parseInt(colors.brand[600].slice(5, 7), 16)}, 0.12)`;
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
          const brandColor = colors.brand[600];
          const r = parseInt(brandColor.slice(1, 3), 16);
          const g = parseInt(brandColor.slice(3, 5), 16);
          const b = parseInt(brandColor.slice(5, 7), 16);

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${tile.opacity})`;
          ctx.fillRect(tile.x, tile.y, GRID_SIZE, GRID_SIZE);
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.3)`;
          ctx.shadowBlur = 5;
          ctx.fillRect(tile.x, tile.y, GRID_SIZE, GRID_SIZE);
          ctx.shadowBlur = 0;
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${tile.opacity * 1.5})`;
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
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchstart', handleInteraction);
      canvas.removeEventListener('touchmove', handleInteraction);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('touchcancel', handleTouchCancel);
      if (longPressTimer.current) clearTimeout(longPressTimer.current);
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [colors, isMobile]);

  return (
    <section className="relative bg-background-primary isolate overflow-hidden min-h-screen flex items-center justify-center pt-20 md:pt-24">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full flex flex-col lg:flex-row items-center justify-center h-full py-12 md:py-16">
        <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left justify-center px-0 lg:pr-8">
          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-background-accent border border-border-light mb-6 sm:mb-8">
            <div className="w-2 h-2 bg-brand-600 rounded-full mr-2 animate-pulse"></div>
            <span className="text-text-accent text-xs sm:text-sm font-medium">Security Engineers-as-a-Service</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] sm:leading-[1.05] mb-6 sm:mb-8">
            <span className="block text-text-primary">Your Security Team,</span>
            <span className="block bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">On Demand</span>
          </h1>
          <p className="text-base sm:text-lg text-text-secondary mb-8 sm:mb-12 max-w-3xl leading-relaxed">
            Stop the security testing cycle. Get dedicated security engineers who work alongside your dev team, every sprint. Proactive, continuous, and developer-friendly security for SaaS and product companies.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <a
              href="/attack-surface-discovery"
              className="bg-brand-500 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-brand-400 shadow-lg shadow-brand-500/50 hover:shadow-xl hover:shadow-brand-400/40 transition-all duration-300"
            >
              Get Free Security Assessment
            </a>
            <a href="/contact" className="bg-black/30 backdrop-blur-sm border border-white/10 text-white px-6 py-3 rounded-full text-sm hover:bg-white/5 hover:border-brand-400/50 transition-all duration-300">
              Contact Us
            </a>
          </div>
        </div>

        <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center mt-8 lg:mt-0">
          <div className="relative aspect-square w-full max-w-xs sm:max-w-sm md:max-w-md">
            <div className="absolute inset-0 rounded-2xl backdrop-blur-sm border border-white/10 bg-gradient-to-br from-[#080808]/95 to-[#101010]/90 overflow-hidden shadow-2xl shadow-brand-400/20">
              <Image
                src="/images/services/blockchain-security-solutions-dubai-uae.jpg"
                alt="Blockchain Security Solutions"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-400/20 to-transparent"></div>
              <div className="absolute top-0 right-0 h-8 sm:h-16 w-[1px] bg-brand-400 transform origin-top"></div>
              <div className="absolute top-0 right-0 w-8 sm:w-16 h-[1px] bg-brand-400 transform origin-right"></div>
              <div className="absolute bottom-0 left-0 h-8 sm:h-16 w-[1px] bg-brand-400 transform origin-bottom"></div>
              <div className="absolute bottom-0 left-0 w-8 sm:w-16 h-[1px] bg-brand-400 transform origin-left"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
