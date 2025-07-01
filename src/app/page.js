// (remove this line) 'use client';

import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CallToAction from '../components/CallToAction'
import { FaUserTie, FaBolt, FaGlobe, FaCode } from 'react-icons/fa'
import { MdOutlineSecurity, MdOutlineDesignServices, MdOutlineBugReport, MdOutlineReport } from 'react-icons/md'
import { User, Hexagon, Globe, Zap, Search, Shield, Wrench, FileText, Bug, DollarSign } from 'lucide-react'
import HeroSection from '../components/HeroSection'
import WhyChooseUs from '../components/WhyChooseUs'
import SecuritySprintProcess from '../components/SecuritySprintProcess'
import ReportShowcase from '../components/ReportShowcase'
import { generateMetadata } from './metadata'
import { organizationJsonLd, websiteJsonLd, breadcrumbJsonLd } from './jsonLd'

const values = [
  {
    icon: <Search className="mx-auto text-3xl stroke-[1.5] text-black" />,
    label: 'Founder-first mindset',
  },
  {
    icon: <Bug className="mx-auto text-3xl stroke-[1.5] text-black" />,
    label: 'Built by engineers, not templates',
  },
  {
    icon: <Wrench className="mx-auto text-3xl stroke-[1.5] text-black" />,
    label: 'UAE-rooted, globally aligned',
  },
  {
    icon: <FileText className="mx-auto text-3xl stroke-[1.5] text-black" />,
    label: 'Rapid delivery, dev-speed pace',
  },
]

const steps = [
  { icon: <Search className="mx-auto text-3xl stroke-[1.5] text-black" />, title: 'Stept 1\nMappling' },
  { icon: <Bug className="mx-auto text-3xl stroke-[1.5] text-black" />, title: 'Pentesting\nin Dev' },
  { icon: <Wrench className="mx-auto text-3xl stroke-[1.5] text-black" />, title: 'Patch\nAdvisory' },
  { icon: <FileText className="mx-auto text-3xl stroke-[1.5] text-black" />, title: 'Report\n& Demo' },
]

export { generateMetadata }

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black font-sans overflow-x-hidden relative" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {/* Brand Gradient/Glassy Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-1/2 w-[200vw] h-[200vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-600/10 via-brand-400/5 to-transparent rounded-full blur-3xl opacity-50" />
        {/* Glassy floating circle */}
        <div className="absolute -left-20 top-40 w-60 h-60 bg-white/10 rounded-full blur-2xl opacity-60 animate-float pointer-events-none" />
      </div>
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <WhyChooseUs />
        <SecuritySprintProcess />
        <ReportShowcase />
        <CallToAction />
        <Footer />
      </div>
    </main>
  )
}
