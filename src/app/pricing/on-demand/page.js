import React from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import OnDemandPricing from '../../../components/OnDemandPricing';
import OnDemandPricingHero from '../../../components/OnDemandPricingHero';
import CallToAction from '../../../components/CallToAction';
import { generateOnDemandMetadata } from '../metadata';
import { organizationJsonLd, websiteJsonLd, breadcrumbOnDemandJsonLd, serviceOnDemandJsonLd } from '../jsonLd';

export const metadata = generateOnDemandMetadata();

export default function OnDemandPricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white relative overflow-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbOnDemandJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceOnDemandJsonLd) }} />
      <Navbar />
      <main className="bg-gray-50">
        <OnDemandPricingHero />
        <OnDemandPricing />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
} 