import React from 'react';
import { generateMetadata } from './metadata';
import Navbar from '../../components/Navbar';
import ClientOnly from '../../components/ClientOnly';
import HowItWorksHero from '../../components/HowItWorksHero';
import HowWhatWeDo from '../../components/HowWhatWeDo';
import HowItWorksProcess from '../../components/HowItWorksProcess';
import HowItWorksWhyItMatters from '../../components/HowItWorksWhyItMatters';
import HowItWorksWhyChooseUs from '../../components/HowItWorksWhyChooseUs';
import Footer from '../../components/Footer';
import CallToAction from '../../components/CallToAction';
import { organizationJsonLd, websiteJsonLd, breadcrumbJsonLd } from './jsonLd';

export { generateMetadata };

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white relative overflow-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {/* Navbar */}
      <Navbar />

      <main className="flex-grow relative">
        <HowItWorksHero />
        <HowWhatWeDo />
        <HowItWorksProcess />
        <HowItWorksWhyItMatters />
        <HowItWorksWhyChooseUs />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
} 