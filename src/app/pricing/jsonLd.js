export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Captrit",
  "url": "https://captrit.ae",
  "logo": "https://captrit.ae/public/images/logo/logo-light.svg",
  "description": "Captrit is a leading cybersecurity company in the UAE, specializing in VAPT, penetration testing, network security, and digital protection solutions.",
  "sameAs": [
    "https://twitter.com/captritcybersec",
    "https://linkedin.com/company/captritcybersec",
    "https://facebook.com/captritcybersec"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Office C1‑1F‑SF10950, C1 Building, Ajman Free Zone",
    "addressLocality": "Ajman",
    "addressRegion": "Ajman",
    "addressCountry": "UAE",
    "postalCode": "932",
    "postOfficeBoxNumber": "932"
  }
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Captrit cybersec",
  "url": "https://captrit.ae"
};

export const breadcrumbJsonLd = {
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
      "name": "Pricing",
      "item": "https://captrit.ae/pricing"
    }
  ]
};

export const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Cybersecurity Pricing Model",
  "serviceType": "Pricing",
  "provider": {
    "@type": "Organization",
    "name": "Captrit",
    "url": "https://captrit.ae"
  },
  "description": "Transparent, flexible cybersecurity pricing for VAPT, penetration testing, managed SOC, and network security services in Dubai and the UAE.",
  "areaServed": {
    "@type": "Country",
    "name": "UAE"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "AED",
    "availability": "https://schema.org/InStock",
    "url": "https://captrit.ae/pricing"
  }
};

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is Captrit's cybersecurity pricing structured?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our pricing is transparent and tailored to your business needs, with flexible packages for VAPT, penetration testing, managed SOC, and more."
      }
    },
    {
      "@type": "Question",
      "name": "Are there any hidden fees?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, all costs are clearly outlined upfront. We believe in full transparency with no hidden charges."
      }
    },
    {
      "@type": "Question",
      "name": "Can I get a custom quote?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely! Contact us for a personalized quote based on your organization's unique requirements."
      }
    }
  ]
}; 

export const breadcrumbOnDemandJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Pricing',
      item: 'https://captrit.com/pricing',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'On-Demand',
      item: 'https://captrit.com/pricing/on-demand',
    },
  ],
};

export const serviceOnDemandJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'On-Demand Security Services',
  description: 'Premium, transparent, on-demand security service pricing in AED and USD. Web, mobile, API, cloud, vCISO, compliance, and more.',
  provider: {
    '@type': 'Organization',
    name: 'Captrit',
    url: 'https://captrit.com',
  },
  areaServed: 'AE',
}; 