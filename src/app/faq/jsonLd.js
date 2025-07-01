export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Captrit',
  url: 'https://captrit.ae',
  logo: 'https://captrit.ae/images/logo/logo-dark.svg',
  description: 'UAE\'s premier offensive security company specializing in advanced penetration testing, red teaming, and vulnerability assessment services.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'AE',
    addressRegion: 'Dubai'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'contact@captrit.ae'
  },
  sameAs: [
    'https://linkedin.com/company/captrit',
    'https://twitter.com/captrit'
  ]
};

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Captrit',
  url: 'https://captrit.ae',
  description: 'Advanced cybersecurity services in the UAE',
  publisher: {
    '@type': 'Organization',
    name: 'Captrit'
  }
};

export const breadcrumbFAQJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://captrit.ae'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'FAQ',
      item: 'https://captrit.ae/faq'
    }
  ]
};

export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is penetration testing and why do I need it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Penetration testing is a simulated cyber attack on your systems to identify vulnerabilities before malicious hackers can exploit them. It helps protect your data, maintain compliance, and build customer trust.'
      }
    },
    {
      '@type': 'Question',
      name: 'How long does a typical penetration test take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The duration varies based on scope and complexity. A basic web application test typically takes 1-2 weeks, while comprehensive infrastructure testing can take 3-4 weeks. We provide detailed timelines during the planning phase.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is the difference between VAPT and penetration testing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VAPT (Vulnerability Assessment and Penetration Testing) is a comprehensive approach that combines automated vulnerability scanning with manual penetration testing. While vulnerability assessment identifies potential weaknesses, penetration testing actively exploits them to demonstrate real-world impact.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do you provide remediation guidance after testing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, our detailed reports include prioritized remediation recommendations, technical guidance, and best practices to help you fix identified vulnerabilities effectively and efficiently.'
      }
    },
    {
      '@type': 'Question',
      name: 'Are your security assessments compliant with industry standards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our assessments follow industry standards including OWASP, NIST, and ISO 27001 methodologies. We can also tailor our approach to meet specific compliance requirements like PCI DSS, SOC 2, or GDPR.'
      }
    },
    {
      '@type': 'Question',
      name: 'What types of applications and systems do you test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We test web applications, mobile apps, APIs, cloud infrastructure, network systems, IoT devices, and more. Our expertise covers both modern and legacy systems across various technologies and platforms.'
      }
    }
  ]
}; 