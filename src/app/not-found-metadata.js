export function generateMetadata() {
  return {
    title: "404 Not Found | Captrit - Cybersecurity Solutions Dubai UAE",
    description: "Sorry, the page you are looking for does not exist. Return to Captrit's homepage for cybersecurity solutions, VAPT, penetration testing, and more.",
    alternates: {
      canonical: "https://captrit.ae/404",
      languages: {
        'en': 'https://captrit.ae/404',
      },
    },
    openGraph: {
      url: "https://captrit.ae/404",
      title: "404 Not Found | Captrit - Cybersecurity Solutions Dubai UAE",
      description: "Sorry, the page you are looking for does not exist. Return to Captrit's homepage for cybersecurity solutions, VAPT, penetration testing, and more.",
      images: [
        {
          url: "https://captrit.ae/public/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "404 Not Found - Captrit"
        }
      ],
      siteName: "Captrit",
      locale: "en_US",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      site: "@captritcybersec",
      creator: "@captritcybersec",
    },
    keywords: "404, not found, page missing, captrit, cybersecurity, vapt, penetration testing, security dubai, security uae",
    authors: [{ name: "Captrit" }],
    robots: "noindex, follow",
    icons: {
      icon: '/favicon.svg',
    }
  };
} 