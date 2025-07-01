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
      "name": "Contact",
      "item": "https://captrit.ae/contact"
    }
  ]
};

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How can I contact Captrit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can reach us via the contact form, email, or phone. Our team will respond promptly to your inquiry."
      }
    },
    {
      "@type": "Question",
      "name": "Where is Captrit located?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our main office is in Ajman Free Zone, UAE, but we serve clients across Dubai, the UAE, and the GCC."
      }
    },
    {
      "@type": "Question",
      "name": "What services can I inquire about?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can contact us for VAPT, penetration testing, managed SOC, network security, and all cybersecurity solutions."
      }
    }
  ]
}; 