'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/captritcybersec/' },
    { name: 'X (Twitter)', href: 'https://x.com/captritcybersec' },
    { name: 'Instagram', href: 'https://www.instagram.com/captritcybersec' },
  ];

  const directoryLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'On-Demand Pricing', href: '/on-demand-pricing' },
    { name: 'Request Assessment', href: '/attack-surface-discovery' },
    { name: 'FAQ', href: '/faq' },
  ];

  const legalLinks = [
    { name: 'Cookie Policy', href: '/cookie-policy' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
  ];

  return (
    <footer className="relative bg-background-primary text-gray-300 border-t border-white/10 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-600/0 via-brand-500/50 to-brand-600/0 blur-lg"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Column 1: Logo and description */}
          <div className="lg:col-span-1 text-center lg:text-left">
            <Link href="/" className="inline-block">
              <img 
                src="/images/logo/logo-dark.svg" 
                alt="Captrit Logo" 
                className="w-auto h-9 object-contain mx-auto lg:mx-0"
              />
            </Link>
            <p className="mt-4 text-gray-400 text-sm max-w-xs mx-auto lg:mx-0">
              There is no room for shortcuts when building a great digital defense. Everything starts with thorough research and iterative testing.
            </p>
            <div className="mt-6">
              <a 
                href="mailto:contact@captrit.ae" 
                className="inline-block bg-brand-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-brand-700 transition-colors duration-300 text-sm"
              >
                contact@captrit.ae
              </a>
            </div>
          </div>

          {/* Column 2 & 3: Links */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-black text-sm uppercase tracking-wider">Our socials.</h3>
              <ul className="mt-4 space-y-3">
                {socialLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan transition-colors duration-200 text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-black text-sm uppercase tracking-wider">Directory.</h3>
              <ul className="mt-4 space-y-3">
                {directoryLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-cyan transition-colors duration-200 text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-black text-sm uppercase tracking-wider">OFFICE.</h3>
              <ul className="mt-4 space-y-3 text-sm text-gray-400">
                <li>
                  Office C1‑1F‑SF10950, C1 Building,
                  <br /> Ajman Free Zone,
                  <br /> Ajman, UAE, 932
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs">
          <p className="text-gray-400 order-2 sm:order-1 mt-4 sm:mt-0">
            © {currentYear} Captrit. All Rights Reserved.
          </p>
          <div className="order-1 sm:order-2 flex space-x-4">
            {legalLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-gray-400 hover:text-cyan transition-colors duration-200">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
