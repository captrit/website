import React from 'react';
import { generateMetadata } from './metadata';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PricingHeroSection from '../../components/PricingHeroSection';
import PricingPlanLogic from '../../components/PricingPlanLogic';
import WhyThisModelWins from '../../components/WhyThisModelWins';
import PricingComparison from '../../components/PricingComparison';
import PricingPsychology from '../../components/PricingPsychology';
import FAQ from '../../components/FAQ';
import CallToAction from '../../components/CallToAction';
import { organizationJsonLd, websiteJsonLd, breadcrumbJsonLd, serviceJsonLd, faqJsonLd } from './jsonLd';

export { generateMetadata };

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white relative overflow-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Navbar />
      <PricingHeroSection />
      <main className="bg-white">
        <PricingPlanLogic />
        <WhyThisModelWins />
        <PricingComparison />
        <PricingPsychology />
        <FAQ />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}