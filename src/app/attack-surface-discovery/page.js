import AttackSurfaceDiscoveryForm from '../../components/AttackSurfaceDiscoveryForm';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://captrit.ae"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Free Attack Surface Discovery",
      "item": "https://captrit.ae/attack-surface-discovery"
    }
  ]
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Free Attack Surface Discovery",
  "description": "Get a free comprehensive attack surface discovery analysis. Identify vulnerabilities, exposed services, and potential attack vectors in your external infrastructure.",
  "provider": {
    "@type": "Organization",
    "name": "Captrit",
    "url": "https://captrit.ae"
  },
  "serviceType": "SecurityAuditing",
  "areaServed": {
    "@type": "Country",
    "name": "UAE"
  },
  "isSimilarTo": [
    "https://captrit.ae/services/vulnerability-assessment-penetration-testing",
    "https://captrit.ae/services/managed-soc"
  ]
};

export const metadata = {
  title: 'Free Attack Surface Discovery | Captrit - Cybersecurity Solutions Dubai UAE',
  description: 'Get a free comprehensive attack surface discovery analysis. Identify vulnerabilities, exposed services, and potential attack vectors in your external infrastructure.',
  keywords: 'attack surface discovery, vulnerability assessment, cybersecurity dubai, security analysis, external reconnaissance, security audit uae',
  openGraph: {
    title: 'Free Attack Surface Discovery | Captrit - Cybersecurity Solutions Dubai UAE',
    description: 'Get a free comprehensive attack surface discovery analysis. Identify vulnerabilities, exposed services, and potential attack vectors in your external infrastructure.',
    url: 'https://captrit.ae/attack-surface-discovery',
    type: 'website',
    images: [
      {
        url: 'https://captrit.ae/images/og-attack-surface.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Attack Surface Discovery - Captrit Cybersecurity'
      }
    ]
  },
  twitter: {
    handle: "@captritcybersec",
    site: "@captritcybersec",
    cardType: "summary_large_image"
  }
};

export default function AttackSurfaceDiscoveryPage() {
  return (
    <main className="min-h-screen bg-white text-black font-sans overflow-x-hidden relative scrollbar-hide">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Navbar />
      <AttackSurfaceDiscoveryForm />
      <Footer />
    </main>
  );
} 