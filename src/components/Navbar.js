'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Helper to check if we're on the client
const isClient = typeof window !== 'undefined';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const pathname = usePathname();
  const mobileMenuRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Only run this effect on the client side
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setLastScrollY((prevScrollY) => {
        if (currentScrollY > prevScrollY) {
          setScrollDirection('down');
        } else if (currentScrollY < prevScrollY) {
          setScrollDirection('up');
        }
        return currentScrollY;
      });

      setIsScrolled(currentScrollY > 10);
    };
    
    // Set initial scroll state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll, { passive: true });
  }, []);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;
    
    if (mobileMenuOpen) {
      // Disable scroll on body
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100%';
      
      // Add animation classes after a small delay to ensure the DOM has updated
      setTimeout(() => {
        if (overlayRef.current) {
          overlayRef.current.classList.add('opacity-60');
        }
        if (mobileMenuRef.current) {
          mobileMenuRef.current.classList.add('translate-x-0');
          mobileMenuRef.current.classList.remove('translate-x-full');
        }
      }, 10);
    } else {
      // Remove animation classes first
      if (overlayRef.current) {
        overlayRef.current.classList.remove('opacity-60');
        overlayRef.current.classList.add('opacity-0');
      }
      if (mobileMenuRef.current) {
        mobileMenuRef.current.classList.remove('translate-x-0');
        mobileMenuRef.current.classList.add('translate-x-full');
      }
      
      // Remove body style after animation completes
      setTimeout(() => {
        document.body.style.overflow = '';
        document.body.style.height = '';
      }, 300); // Match transition duration
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        document.body.style.overflow = '';
        document.body.style.height = '';
      }
    };
  }, [mobileMenuOpen]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed w-full z-[9999] py-1.5 sm:py-2 ${isDesktop && scrollDirection === 'down' && isScrolled ? '-translate-y-full' : 'translate-y-0'} transition-transform duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div 
            className={`relative flex items-center justify-between 
              rounded-2xl py-1.5 sm:py-2 px-4 sm:px-6
              bg-white/95 backdrop-blur-xl border border-white/30
              transition-all duration-300
              ${isScrolled 
                ? 'shadow-[0_8px_32px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.08)]' 
                : 'shadow-[0_4px_16px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)]'
              }`}
          >
            {/* Subtle Gradient Background */}
            <div
              className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-2xl"
              aria-hidden="true"
            >
              <div className="absolute left-1/2 top-1/2 w-[120vw] h-[120vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-600/5 via-brand-400/3 to-transparent rounded-full blur-3xl opacity-60" />
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center relative z-10 group">
              <div className="relative h-7 sm:h-10 w-auto transition-transform duration-300 group-hover:scale-105">
                <img 
                  src="/images/logo/logo-dark.svg" 
                  alt="Captrit Logo" 
                  className="w-auto h-full object-contain"
                />
              </div>
            </Link>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center justify-center space-x-0.5 relative z-10">
              <Link href="/" className={`text-gray-600 hover:text-gray-900 text-sm px-2 lg:px-3 py-2 rounded-xl transition-all duration-300 font-medium ${pathname === '/' ? 'bg-brand-50 text-brand-700 border border-brand-200' : 'hover:bg-gray-50'}`}>
                Home
              </Link>
              <Link href="/how-it-works" className={`text-gray-600 hover:text-gray-900 text-sm font-medium px-2 lg:px-3 py-2 rounded-xl transition-all duration-300 whitespace-nowrap ${pathname === '/how-it-works' ? 'bg-brand-50 text-brand-700 border border-brand-200' : 'hover:bg-gray-50'}`}>
                Process
              </Link>
              <Link href="/pricing" className={`text-gray-600 hover:text-gray-900 text-sm font-medium px-2 lg:px-3 py-2 rounded-xl transition-all duration-300 ${pathname === '/pricing' ? 'bg-brand-50 text-brand-700 border border-brand-200' : 'hover:bg-gray-50'}`}>
                Pricing
              </Link>
              <Link href="/pricing/on-demand" className={`text-gray-600 hover:text-gray-900 text-sm font-medium px-2 lg:px-3 py-2 rounded-xl transition-all duration-300 whitespace-nowrap ${pathname === '/pricing/on-demand' ? 'bg-brand-50 text-brand-700 border border-brand-200' : 'hover:bg-gray-50'}`}>
                On-Demand
              </Link>
              <Link href="/about" className={`text-gray-600 hover:text-gray-900 text-sm font-medium px-2 lg:px-3 py-2 rounded-xl transition-all duration-300 ${pathname === '/about' ? 'bg-brand-50 text-brand-700 border border-brand-200' : 'hover:bg-gray-50'}`}>
                About
              </Link>
              <Link href="/blog" className={`text-gray-600 hover:text-gray-900 text-sm font-medium px-2 lg:px-3 py-2 rounded-xl transition-all duration-300 ${pathname.includes('/blog') ? 'bg-brand-50 text-brand-700 border border-brand-200' : 'hover:bg-gray-50'}`}>
                Blog
              </Link>
              <Link href="/careers" className={`text-gray-600 hover:text-gray-900 text-sm font-medium px-2 lg:px-3 py-2 rounded-xl transition-all duration-300 ${pathname.includes('/careers') ? 'bg-brand-50 text-brand-700 border border-brand-200' : 'hover:bg-gray-50'}`}>
                Careers
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center relative z-10">
              <Link 
                href="/contact" 
                className="group relative inline-flex items-center justify-center bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white px-3 lg:px-5 py-2 sm:py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ml-2 sm:ml-3 shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/30 hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                <span className="relative flex items-center">
                  Contact Us
                  <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  className="text-gray-600 p-2 ml-2 sm:ml-3 bg-gray-50 hover:bg-gray-100 hover:text-gray-900 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md"
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="Open menu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-out Menu - moved outside the nav element */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[99999]" style={{ pointerEvents: 'all' }}>
          {/* Overlay */}
          <div
            ref={overlayRef}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm opacity-0 transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
            style={{ pointerEvents: 'auto' }}
          />
          
          {/* Slide-out menu */}
          <div
            ref={mobileMenuRef}
            className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white/95 backdrop-blur-xl border-l border-gray-200 shadow-2xl shadow-black/20 flex flex-col p-6 overflow-y-auto translate-x-full transition-transform duration-300 ease-in-out"
            style={{ pointerEvents: 'auto' }}
          >
            <button
              className="self-end mb-8 text-gray-500 hover:text-gray-700 p-2 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <nav className="flex flex-col space-y-2 relative">
              <Link 
                href="/" 
                className={`text-gray-600 hover:text-gray-900 text-lg py-3 px-4 rounded-xl transition-all duration-300 font-medium
                  ${pathname === '/' 
                    ? 'bg-brand-50 text-brand-700 border border-brand-200' 
                    : 'hover:bg-gray-50'
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              <Link 
                href="/how-it-works" 
                className={`text-gray-600 hover:text-gray-900 text-lg py-3 px-4 rounded-xl transition-all duration-300 font-medium
                  ${pathname === '/how-it-works' 
                    ? 'bg-brand-50 text-brand-700 border border-brand-200' 
                    : 'hover:bg-gray-50'
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Process
              </Link>

              <Link 
                href="/pricing" 
                className={`text-gray-600 hover:text-gray-900 text-lg py-3 px-4 rounded-xl transition-all duration-300 font-medium
                  ${pathname === '/pricing' 
                    ? 'bg-brand-50 text-brand-700 border border-brand-200' 
                    : 'hover:bg-gray-50'
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>

              <Link 
                href="/pricing/on-demand" 
                className={`text-gray-600 hover:text-gray-900 text-lg py-3 px-4 rounded-xl transition-all duration-300 font-medium whitespace-nowrap
                  ${pathname === '/pricing/on-demand' 
                    ? 'bg-brand-50 text-brand-700 border border-brand-200' 
                    : 'hover:bg-gray-50'
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                On-Demand
              </Link>

              <Link 
                href="/about" 
                className={`text-gray-600 hover:text-gray-900 text-lg py-3 px-4 rounded-xl transition-all duration-300 font-medium
                  ${pathname === '/about' 
                    ? 'bg-brand-50 text-brand-700 border border-brand-200' 
                    : 'hover:bg-gray-50'
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>

              <Link 
                href="/blog" 
                className={`text-gray-600 hover:text-gray-900 text-lg py-3 px-4 rounded-xl transition-all duration-300 font-medium
                  ${pathname.includes('/blog') 
                    ? 'bg-brand-50 text-brand-700 border border-brand-200' 
                    : 'hover:bg-gray-50'
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>

              <Link 
                href="/careers" 
                className={`text-gray-600 hover:text-gray-900 text-lg py-3 px-4 rounded-xl transition-all duration-300 font-medium
                  ${pathname.includes('/careers') 
                    ? 'bg-brand-50 text-brand-700 border border-brand-200' 
                    : 'hover:bg-gray-50'
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Careers
              </Link>

              <Link 
                href="/contact" 
                className="group relative inline-flex items-center justify-center bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white px-6 py-3 rounded-xl text-lg font-bold transition-all duration-300 mt-6 text-center shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/30 hover:scale-105 active:scale-95" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="relative flex items-center">
                  Contact Us
                  <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}