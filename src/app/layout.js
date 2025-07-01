import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import ScrollClassProvider from './ScrollClassProvider'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata = {
  title: 'CAPTRIT - Security Sprints for SaaS & Startups',
  description: 'Security sprints for SaaS, startups, and dev-first teams. Get your first threat report — free, within 48 hours.',
  alternates: {
    canonical: 'https://captrit.ae/',
    languages: {
      'en': 'https://captrit.ae/',
    },
  },
  openGraph: {
    url: 'https://captrit.ae/',
    title: 'CAPTRIT - Security Sprints for SaaS & Startups',
    description: 'Security sprints for SaaS, startups, and dev-first teams. Get your first threat report — free, within 48 hours.',
    images: [
      {
        url: 'https://captrit.ae/public/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Captrit - Security Sprints for SaaS & Startups'
      }
    ],
    siteName: 'Captrit',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@captritcybersec',
    creator: '@captritcybersec',
  },
  keywords: 'cybersecurity, security sprints, vapt, penetration testing, managed soc, network security, devsecops, security for startups, saas security, security dubai, security uae, captrit',
  authors: [{ name: 'Captrit' }],
  robots: 'index, follow',
  icons: {
    icon: '/favicon.svg',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3YH0S4KR0V"
          strategy="afterInteractive"
          async
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3YH0S4KR0V');
          `}
        </Script>
        <Script id="linkedin-insight-init" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "7378292";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `}
        </Script>
        <Script id="linkedin-insight-script" strategy="afterInteractive">
          {`
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "s3qsxc694k");
          `}
        </Script>
      </head>
      <body className="bg-primary font-sans antialiased">
        <noscript>
          <img height="1" width="1" style={{display:'none'}} alt="" src="https://px.ads.linkedin.com/collect/?pid=7378292&fmt=gif" />
        </noscript>
        <ScrollClassProvider />
        {children}
      </body>
    </html>
  )
} 