import { DefaultSeo } from 'next-seo';

const DEFAULT_SEO = {
  titleTemplate: '%s | Captrit',
  defaultTitle: 'Captrit - Enterprise-grade cybersecurity solutions powered by AI',
  description: 'Captrit is UAE\'s premier offensive security company specializing in comprehensive IT solutions with a commitment to excellence.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://captrit.ae/',
    siteName: 'Captrit',
    images: [
      {
        url: 'https://captrit.ae/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Captrit - Enterprise-grade cybersecurity solutions',
      },
    ],
  },
  twitter: {
    handle: '@captrit',
    site: '@captrit',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    },
    {
      name: 'theme-color',
      content: '#0b0f1a',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.svg',
    },
  ],
};

export default function SEO() {
  return <DefaultSeo {...DEFAULT_SEO} />;
} 