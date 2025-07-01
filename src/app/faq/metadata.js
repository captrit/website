export function generateFAQMetadata() {
  return {
    title: 'FAQ - Cybersecurity Services | Captrit',
    description: 'Get answers to frequently asked questions about our cybersecurity services, penetration testing, red teaming, and security consulting in the UAE.',
    keywords: 'cybersecurity FAQ, penetration testing questions, red teaming FAQ, security consulting UAE, VAPT services, application security',
    openGraph: {
      title: 'FAQ - Cybersecurity Services | Captrit',
      description: 'Get answers to frequently asked questions about our cybersecurity services, penetration testing, red teaming, and security consulting in the UAE.',
      url: 'https://captrit.ae/faq',
      siteName: 'Captrit',
      images: [
        {
          url: 'https://captrit.ae/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Captrit FAQ - Cybersecurity Services',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'FAQ - Cybersecurity Services | Captrit',
      description: 'Get answers to frequently asked questions about our cybersecurity services, penetration testing, red teaming, and security consulting in the UAE.',
      images: ['https://captrit.ae/images/og-image.jpg'],
    },
    alternates: {
      canonical: 'https://captrit.ae/faq',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
} 