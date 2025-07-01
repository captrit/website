import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FAQHero from '../../components/FAQHero';
import FAQContent from '../../components/FAQContent';
import CallToAction from '../../components/CallToAction';
import { generateFAQMetadata } from './metadata';
import { organizationJsonLd, websiteJsonLd, breadcrumbFAQJsonLd, faqJsonLd } from './jsonLd';

export const metadata = generateFAQMetadata();

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white relative overflow-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbFAQJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <FAQHero />
        <FAQContent />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
} 