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
    }
  ]
}; 