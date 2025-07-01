import React from 'react';
import { generateMetadata } from './metadata';
import Navbar from '../../components/Navbar';
import AboutHeroSection from '../../components/AboutHeroSection';
import AboutExpertiseSection from '../../components/AboutExpertiseSection';
import AboutJourneySection from '../../components/AboutJourneySection';
import CallToAction from '../../components/CallToAction';
import Footer from '../../components/Footer';
import { organizationJsonLd, websiteJsonLd, breadcrumbJsonLd } from './jsonLd';

export { generateMetadata };

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen bg-white relative overflow-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      
      {/* Navbar */}
      <Navbar />
      
      <main className="flex-grow relative">
        <AboutHeroSection />
        <AboutExpertiseSection />
        <AboutJourneySection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
} 