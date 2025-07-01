export function generateMetadata() {
  return {
    title: "About Captrit | Leading Cybersecurity Service Providers in UAE",
    description: "Discover Captrit's journey in revolutionizing UAE's cybersecurity landscape. Learn about our expertise in VAPT, penetration testing, network security, and digital protection solutions for businesses across Dubai and GCC.",
    alternates: {
      canonical: "https://captrit.ae/about",
      languages: {
        'en': 'https://captrit.ae/about',
      },
    },
    openGraph: {
      url: "https://captrit.ae/about",
      title: "About Captrit | Leading Cybersecurity Service Providers in UAE",
      description: "Discover Captrit's journey in revolutionizing UAE's cybersecurity landscape. Learn about our expertise in VAPT, penetration testing, network security, and digital protection solutions for businesses across Dubai and GCC.",
      images: [
        {
          url: "https://captrit.ae/public/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Captrit - Leading Cybersecurity Service Providers in UAE"
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
    keywords: "about captrit, cybersecurity uae, vapt dubai, penetration testing, network security, digital protection, cybersecurity company dubai, security experts uae, managed security, soc, data security, cloud security, it security dubai, cybersecurity solutions, uae cybersecurity, dubai security experts",
    authors: [{ name: "Captrit" }],
    robots: "index, follow",
    icons: {
      icon: '/favicon.svg',
    }
  };
} 