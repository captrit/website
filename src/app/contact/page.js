import ContactHeroSection from '../../components/ContactHeroSection';
import ContactFormSection from '../../components/ContactFormSection';
import ContactInfoSection from '../../components/ContactInfoSection';
import CallToAction from '../../components/CallToAction';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { generateMetadata } from './metadata';
import { organizationJsonLd, websiteJsonLd, breadcrumbJsonLd, faqJsonLd } from './jsonLd';

export { generateMetadata };

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-black font-sans overflow-x-hidden relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Navbar />
      <ContactHeroSection />
      <ContactFormSection />
      <CallToAction />
      <Footer />
    </main>
  );
} 